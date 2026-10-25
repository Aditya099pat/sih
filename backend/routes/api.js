import { Router } from 'express';
import { 
  initialInstruments, 
  initialSanctionsRegistry, 
  initialSanctionsList,
  initialEscalationLadder, 
  initialAuditChain, 
  initialSfmsMessages, 
  initialDossierDocs,
  computeScholarshipYield, 
  computeRegionalData,
  generateSha256 
} from '../../data/store.js';
import { answerCopilotQuery } from '../services/copilotEngine.js';

const router = Router();

// In-memory working state
let instruments = [...initialInstruments];
let sanctionsRegistry = { ...initialSanctionsRegistry };
let sanctionsList = [...initialSanctionsList];
let escalationLadder = [...initialEscalationLadder];
let auditChain = [...initialAuditChain];
let sfmsMessages = [...initialSfmsMessages];
let dossierDocs = [...initialDossierDocs];

// 1. INSTRUMENTS REPOSITORY API
router.get('/instruments', (req, res) => {
  const { page, limit, search, status, bank, region } = req.query;

  let filtered = [...instruments];

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(i => 
      i.ref.toLowerCase().includes(q) ||
      i.instituteName.toLowerCase().includes(q) ||
      i.instituteCode.toLowerCase().includes(q) ||
      i.bankName.toLowerCase().includes(q) ||
      i.ifsc.toLowerCase().includes(q) ||
      i.discipline.toLowerCase().includes(q) ||
      i.fdrReceiptNo.toLowerCase().includes(q)
    );
  }

  if (status && status !== 'all') {
    if (status === 'verified') filtered = filtered.filter(i => i.bankConfirmed);
    else if (status === 'expiring') filtered = filtered.filter(i => i.remainingDays <= 90);
    else if (status === 'discrepancy') filtered = filtered.filter(i => i.hasDiscrepancy);
    else if (status === 'pending') filtered = filtered.filter(i => !i.bankConfirmed);
    else if (status === 'release') filtered = filtered.filter(i => i.remainingDays <= 60);
  }

  if (bank && bank !== 'all') {
    filtered = filtered.filter(i => i.bankName.toLowerCase().includes(bank.toLowerCase()));
  }

  if (region && region !== 'all') {
    filtered = filtered.filter(i => i.region === region);
  }

  const total = filtered.length;
  const totalPrincipal = instruments.reduce((s, i) => s + (i.principalAmount || 0), 0);
  const totalAccrued = instruments.reduce((s, i) => s + (i.accruedInterest || 0), 0);
  const maturingCount = instruments.filter(i => i.remainingDays <= 60).length;
  const discrepancyCount = instruments.filter(i => i.hasDiscrepancy).length;
  const verifiedCount = instruments.filter(i => i.bankConfirmed).length;
  const releaseReadyCount = instruments.filter(i => i.remainingDays <= 60 && i.bankConfirmed).length;

  if (page && limit) {
    const p = Math.max(1, parseInt(page, 10));
    const l = Math.max(1, parseInt(limit, 10));
    const startIndex = (p - 1) * l;
    const paginated = filtered.slice(startIndex, startIndex + l);

    return res.json({
      success: true,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
      count: paginated.length,
      data: paginated,
      summaryStats: {
        totalPrincipal,
        totalAccrued,
        maturingCount,
        discrepancyCount,
        verifiedCount,
        releaseReadyCount,
        totalRegistered: instruments.length
      }
    });
  }

  res.json({ 
    success: true, 
    count: filtered.length, 
    total: filtered.length,
    data: filtered,
    summaryStats: {
      totalPrincipal,
      totalAccrued,
      maturingCount,
      discrepancyCount,
      verifiedCount,
      releaseReadyCount,
      totalRegistered: instruments.length
    }
  });
});

router.post('/instruments', (req, res) => {
  const newInst = {
    id: 'fdr-' + Date.now(),
    ref: req.body.ref || `FDR-SBI-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 89)}`,
    instituteCode: req.body.instituteCode || '1-1029384',
    instituteName: req.body.instituteName || 'Bharati Vidya Sansthan',
    campusType: req.body.campusType || 'Owned Campus',
    discipline: req.body.discipline || 'Technical Program',
    disciplineCategory: req.body.disciplineCategory || 'engineering',
    disciplineCode: req.body.disciplineCode || 'UG-ENGG',
    dotColor: '#059669',
    type: 'Joint Fixed Deposit',
    custodyMode: req.body.custodyMode || 'SFMS e-Lien Registered',
    bankName: req.body.bankName || 'State Bank of India',
    branchName: req.body.branchName || 'Bandra Kurla Br.',
    ifsc: req.body.ifsc || 'SBIN0004521',
    principalAmount: Number(req.body.principalAmount) || 3500000,
    accruedInterest: 0,
    interestRate: Number(req.body.interestRate) || 7.20,
    issueDate: req.body.issueDate || `01 Aug ${new Date().getFullYear()}`,
    maturityDate: req.body.maturityDate || `31 Jul ${new Date().getFullYear() + 8}`,
    remainingDays: (Number(req.body.termYears) || 8) * 365,
    termYears: Number(req.body.termYears) || 8,
    verificationSource: 'Trust Declared & SFMS e-Lien',
    bankApiStatus: 'SBI CBS ✓',
    bankConfirmed: true,
    bankConfirmedBy: 'State Bank of India CBS',
    statutoryStatus: 'Active (>180 Days)',
    statusType: 'success',
    jointLienWith: 'Member Secretary, AICTE New Delhi',
    fdrReceiptNo: req.body.fdrReceiptNo || `SBI-FD-${Math.floor(1e7 + Math.random() * 9e7)}`,
    sfmsReference: req.body.sfmsReference || `SFMS/${new Date().getFullYear()}/L799/${Math.floor(1e5 + Math.random() * 9e5)}`,
    eStampNumber: req.body.eStampNumber || `IN-MH${Math.floor(1e9 + Math.random() * 9e9)}D`,
    intakeCapacity: Number(req.body.intakeCapacity) || 60,
    approvedYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    phaseReleaseEligible: false,
    ocrConfidence: 98.2,
    hasDiscrepancy: false
  };

  instruments.unshift(newInst);

  // Append to SHA-256 Chained Audit Ledger
  const lastBlock = auditChain[auditChain.length - 1];
  const newBlock = {
    index: auditChain.length + 1,
    title: `New Joint FDR Registered: ${newInst.ref}`,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    action: 'INSTRUMENT_REGISTERED',
    actor: req.body.actor || 'Dr. Rajesh K. Sharma (Registrar)',
    previousHash: lastBlock ? lastBlock.hash : '0',
    data: {
      instrumentRef: newInst.ref,
      amount: newInst.principalAmount,
      bank: newInst.bankName,
      intake: newInst.intakeCapacity
    }
  };
  newBlock.hash = generateSha256(newBlock.index + newBlock.timestamp + newBlock.previousHash + JSON.stringify(newBlock.data));
  auditChain.push(newBlock);

  res.status(201).json({ success: true, message: 'Instrument registered and chained to SHA-256 ledger.', data: newInst, block: newBlock });
});

// 2. DUAL-TRACK SCRUTINY & OCR DISCREPANCY API (USP 1)
router.post('/scrutiny/verify', (req, res) => {
  const { instrumentId, officerName } = req.body;
  const inst = instruments.find(i => i.id === instrumentId);
  if (!inst) return res.status(404).json({ success: false, message: 'Instrument not found' });

  inst.statutoryStatus = 'Active (>180 Days)';
  inst.statusType = 'success';
  inst.bankApiStatus = 'SBI CBS ✓';
  inst.bankConfirmed = true;
  inst.hasDiscrepancy = false;

  const lastBlock = auditChain[auditChain.length - 1];
  const newBlock = {
    index: auditChain.length + 1,
    title: `Bureau Scrutiny Seal Affixed: ${inst.ref}`,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    action: 'SCRUTINY_APPROVED',
    actor: officerName || 'Sh. V. K. Nambiar (ADG, WRO Mumbai)',
    previousHash: lastBlock.hash,
    data: {
      instrumentId: inst.id,
      ref: inst.ref,
      ocrConfidence: inst.ocrConfidence,
      verifiedLien: inst.jointLienWith
    }
  };
  newBlock.hash = generateSha256(newBlock.index + newBlock.timestamp + newBlock.previousHash + JSON.stringify(newBlock.data));
  auditChain.push(newBlock);

  res.json({ success: true, message: 'Statutory verification completed. Encumbrance seal active.', data: inst, block: newBlock });
});

router.post('/scrutiny/reject', (req, res) => {
  const { instrumentId, deficiencyRemarks, officerName } = req.body;
  const inst = instruments.find(i => i.id === instrumentId);
  if (!inst) return res.status(404).json({ success: false, message: 'Instrument not found' });

  inst.statutoryStatus = 'Discrepancy Flagged';
  inst.statusType = 'error';
  inst.hasDiscrepancy = true;
  inst.discrepancyNote = deficiencyRemarks || 'Lien clause does not match APH format specification.';

  const lastBlock = auditChain[auditChain.length - 1];
  const newBlock = {
    index: auditChain.length + 1,
    title: `Deficiency Memo Dispatched: ${inst.ref}`,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    action: 'SCRUTINY_DEFICIENCY_FLAGGED',
    actor: officerName || 'Sh. V. K. Nambiar (ADG, WRO Mumbai)',
    previousHash: lastBlock.hash,
    data: {
      instrumentId: inst.id,
      deficiencyRemarks: inst.discrepancyNote,
      actionRequired: 'Replace certificate or submit tripartite addendum'
    }
  };
  newBlock.hash = generateSha256(newBlock.index + newBlock.timestamp + newBlock.previousHash + JSON.stringify(newBlock.data));
  auditChain.push(newBlock);

  res.json({ success: true, message: 'Deficiency memo recorded and flagged in audit ledger.', data: inst, block: newBlock });
});

// 3. CROSS-BUREAU SANCTION FREEZE API (USP 2)
let comprehensiveSanctions = {
  instituteCode: "1-1029384",
  instituteName: "Bharati Vidya Sansthan",
  overallReleaseLocked: true,
  evcFindings: {
    isDelinquent: true,
    status: "Delinquent",
    inspectionDate: "14 Jul 2026",
    orderNo: "EVC-WRO-2026-0819",
    penalty: "Zero Intake for AY 2026-27",
    deficiency: "Severe deficiency in faculty cadre ratio (1:35 vs mandatory 1:15) and lack of specialized AICTE robotics lab equipment."
  },
  ombudsmanComplaints: {
    unresolvedCount: 12,
    status: "Action Required",
    totalAmountClaimed: 1450000,
    caseRef: "OMBUD/2026/FEE/892",
    description: "12 student grievances pending adjudication regarding withheld capitation fee refunds following unapproved branch closure."
  },
  courtLitigation: {
    activeStayOrder: true,
    status: "Injunction Active",
    court: "High Court of Bombay",
    petitionNo: "WP(C) 4410 of 2026",
    details: "Interim injunction restraining encashment or refund of joint deposits pending settlement of 7th CPC faculty salary arrears."
  }
};

router.get('/sanctions', (req, res) => {
  const { instituteCode } = req.query;
  if (instituteCode) {
    const found = sanctionsList.find(s => s.instituteCode === instituteCode);
    if (found) {
      return res.json({ success: true, data: found, institutionsList: sanctionsList });
    }
  }
  res.json({ 
    success: true, 
    data: comprehensiveSanctions, 
    institutionsList: sanctionsList,
    totalSanctionedCount: sanctionsList.length
  });
});

router.post('/sanctions/toggle', (req, res) => {
  const { gate, officerName } = req.body;

  if (gate === 'evc') {
    comprehensiveSanctions.evcFindings.isDelinquent = !comprehensiveSanctions.evcFindings.isDelinquent;
    comprehensiveSanctions.evcFindings.status = comprehensiveSanctions.evcFindings.isDelinquent ? "Delinquent" : "Compliant ✓";
  } else if (gate === 'ombudsman') {
    comprehensiveSanctions.ombudsmanComplaints.unresolvedCount = comprehensiveSanctions.ombudsmanComplaints.unresolvedCount > 0 ? 0 : 12;
    comprehensiveSanctions.ombudsmanComplaints.status = comprehensiveSanctions.ombudsmanComplaints.unresolvedCount > 0 ? "Action Required" : "Cleared ✓";
  } else if (gate === 'court') {
    comprehensiveSanctions.courtLitigation.activeStayOrder = !comprehensiveSanctions.courtLitigation.activeStayOrder;
    comprehensiveSanctions.courtLitigation.status = comprehensiveSanctions.courtLitigation.activeStayOrder ? "Injunction Active" : "Vacated / Clean ✓";
  } else {
    comprehensiveSanctions.overallReleaseLocked = !comprehensiveSanctions.overallReleaseLocked;
  }

  // Recalculate overall lock
  comprehensiveSanctions.overallReleaseLocked = 
    comprehensiveSanctions.evcFindings.isDelinquent || 
    comprehensiveSanctions.ombudsmanComplaints.unresolvedCount > 0 || 
    comprehensiveSanctions.courtLitigation.activeStayOrder;

  const lastBlock = auditChain[auditChain.length - 1];
  const newBlock = {
    index: auditChain.length + 1,
    title: `Cross-Bureau Sanction State Modified (Gate: ${gate || 'All'}): ${comprehensiveSanctions.overallReleaseLocked ? 'HARD-FREEZE IMPOSED' : 'SANCTION CLEARED'}`,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    action: comprehensiveSanctions.overallReleaseLocked ? 'POLICY_FREEZE_ENFORCED' : 'POLICY_FREEZE_LIFTED',
    actor: officerName || 'AICTE Policy-as-Code Enforcement Engine',
    previousHash: lastBlock ? lastBlock.hash : '0',
    data: {
      overallLocked: comprehensiveSanctions.overallReleaseLocked,
      gateModified: gate,
      evcDelinquent: comprehensiveSanctions.evcFindings.isDelinquent,
      ombudsmanPending: comprehensiveSanctions.ombudsmanComplaints.unresolvedCount,
      courtStayActive: comprehensiveSanctions.courtLitigation.activeStayOrder
    }
  };
  newBlock.hash = generateSha256(newBlock.index + newBlock.timestamp + newBlock.previousHash + JSON.stringify(newBlock.data));
  auditChain.push(newBlock);

  res.json({ 
    success: true, 
    message: `Sanction policy re-evaluated. Phase-5 Release is ${comprehensiveSanctions.overallReleaseLocked ? 'HARD-LOCKED' : 'PERMITTED'}.`,
    data: comprehensiveSanctions,
    block: newBlock
  });
});

// 4. MULTI-STAGE ESCALATION LADDER API (USP 3)
router.get('/escalation', (req, res) => {
  res.json({ success: true, data: escalationLadder });
});

router.post('/escalation/trigger-scn', (req, res) => {
  const { instrumentRef } = req.body;
  const draftScn = {
    noticeNo: `AICTE/WRO/SCN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('en-IN'),
    subject: `SHOW-CAUSE NOTICE UNDER APH SEC 1.4: NON-RENEWAL OF STATUTORY DEPOSIT ${instrumentRef}`,
    addressee: 'The Chairman / Secretary, Bharati Vidya Sansthan (PID: 1-1029384)',
    content: `WHEREAS instrument ${instrumentRef} reached its statutory maturity tenure without timely renewal or tripartite rollover authorization. YOU ARE HEREBY DIRECTED to show cause within 15 calendar days why provisional intake embargo under Section 1.4.7 should not be enforced.`,
    penalClause: 'AICTE Approval Regulations 2025 Sec 1.4.7 (Provisional Intake Freeze)'
  };

  res.json({ success: true, message: 'Draft Statutory Show-Cause Notice generated successfully.', data: draftScn });
});

// 5. APH TABLE 1.4 STATUTORY CALCULATOR & PENALTY ENGINE (USP 4)
router.post('/calculator/compute', (req, res) => {
  const {
    discipline,
    program,
    intake = 60,
    isLeasehold = false,
    isConcessionEligible = false,
    concessionCategory = 'none',
    category = 'unreserved',
    campusType = 'owned',
    institutionType = 'new',
    closureForfeiturePct = 0
  } = req.body;

  const progName = discipline || program || 'Engineering & Technology';
  const progLower = progName.toLowerCase();

  let baseAmount = 3500000;
  if (progLower.includes('pharmacy')) baseAmount = 2500000;
  else if (progLower.includes('management') || progLower.includes('mba') || progLower.includes('pgdm')) baseAmount = 1500000;
  else if (progLower.includes('mca') || progLower.includes('computer')) baseAmount = 1500000;
  else if (progLower.includes('architecture')) baseAmount = 2000000;
  else if (progLower.includes('hotel') || progLower.includes('catering')) baseAmount = 1500000;
  else if (progLower.includes('arts') || progLower.includes('crafts')) baseAmount = 1500000;

  const hasConcession = isConcessionEligible || category === 'women' || category === 'ner' || category === 'minority';
  const concessionDeduction = hasConcession ? (baseAmount * 0.5) : 0;
  const isLease = isLeasehold || campusType === 'leasehold';
  const leaseMultiplier = isLease ? 2.0 : 1.0;
  const finalRequiredDeposit = (baseAmount - concessionDeduction) * leaseMultiplier;

  const forfeiturePercent = closureForfeiturePct || 0;
  const forfeitureAmount = Math.round((finalRequiredDeposit * forfeiturePercent) / 100);
  const netRefundAfterPenalty = finalRequiredDeposit - forfeitureAmount;

  res.json({
    success: true,
    data: {
      discipline: progName,
      program: progName,
      intake,
      baseAmount,
      concessionDeduction,
      leaseMultiplier,
      finalRequiredDeposit,
      baselineRequiredDeposit: finalRequiredDeposit,
      statutoryTenureYears: 8,
      breakdownNote: `${isLease ? '2.0x Leasehold multiplier applied.' : 'Owned freehold campus.'} ${hasConcession ? '50% affirmative concession applied.' : ''}`,
      closureForfeiturePct: forfeiturePercent,
      forfeitureAmount,
      netRefundAfterPenalty
    }
  });
});

router.post('/calculator/forfeiture', (req, res) => {
  const { grossDeposit, forfeiturePercent, reason } = req.body;
  const gross = Number(grossDeposit) || 3500000;
  const pct = Number(forfeiturePercent) || 25;
  const forfeitedAmount = Math.round((gross * pct) / 100);
  const netRefundableAmount = gross - forfeitedAmount;

  res.json({
    success: true,
    data: {
      grossDeposit: gross,
      forfeiturePercent: pct,
      forfeitedAmount,
      netRefundableAmount,
      reason: reason || 'unapproved_closure',
      statutoryOrder: `ORDER #AICTE/REG/WRO/FORF-${Date.now()}`
    }
  });
});

// 6. CRYPTOGRAPHIC SHA-256 AUDIT LEDGER API (USP 5)
router.get('/ledger', (req, res) => {
  const { page, limit, search } = req.query;
  let filtered = [...auditChain];

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(b => 
      b.hash.toLowerCase().includes(q) ||
      b.title.toLowerCase().includes(q) ||
      b.actor.toLowerCase().includes(q) ||
      b.action.toLowerCase().includes(q)
    );
  }

  if (page && limit) {
    const p = Math.max(1, parseInt(page, 10));
    const l = Math.max(1, parseInt(limit, 10));
    const startIndex = (p - 1) * l;
    return res.json({
      success: true,
      total: filtered.length,
      page: p,
      limit: l,
      totalPages: Math.ceil(filtered.length / l),
      count: Math.min(l, filtered.length - startIndex),
      data: filtered.slice(startIndex, startIndex + l)
    });
  }

  res.json({ success: true, count: filtered.length, total: filtered.length, data: filtered });
});

router.post('/ledger/verify', (req, res) => {
  let isValid = true;
  let brokenIndex = -1;

  for (let i = 1; i < auditChain.length; i++) {
    const current = auditChain[i];
    const prev = auditChain[i - 1];

    if (current.previousHash !== prev.hash) {
      isValid = false;
      brokenIndex = i;
      break;
    }
  }

  res.json({
    success: true,
    isChainValid: isValid,
    blocksInspected: auditChain.length,
    brokenBlockIndex: brokenIndex,
    latestBlockHash: auditChain[auditChain.length - 1].hash,
    cvcAuditReady: isValid
  });
});

// 7. SFMS MT760/MT799 CORE BANKING GATEWAY SIMULATOR API (USP 6)
router.get('/sfms/messages', (req, res) => {
  const { page, limit, search, type, bank } = req.query;
  let filtered = [...sfmsMessages];

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(m => 
      m.sfmsReference.toLowerCase().includes(q) ||
      m.title.toLowerCase().includes(q) ||
      m.bank.toLowerCase().includes(q) ||
      m.senderBic.toLowerCase().includes(q)
    );
  }

  if (type && type !== 'all') {
    filtered = filtered.filter(m => m.type === type);
  }

  if (bank && bank !== 'all') {
    filtered = filtered.filter(m => m.bank.toLowerCase().includes(bank.toLowerCase()));
  }

  if (page && limit) {
    const p = Math.max(1, parseInt(page, 10));
    const l = Math.max(1, parseInt(limit, 10));
    const startIndex = (p - 1) * l;
    return res.json({
      success: true,
      total: filtered.length,
      page: p,
      limit: l,
      totalPages: Math.ceil(filtered.length / l),
      count: Math.min(l, filtered.length - startIndex),
      data: filtered.slice(startIndex, startIndex + l)
    });
  }

  res.json({ success: true, count: filtered.length, total: filtered.length, data: filtered });
});

router.post('/sfms/simulate-mt760', (req, res) => {
  const { fdrRef, principal, bankName, ifsc } = req.body;
  const msg = {
    id: 'sfms-' + Date.now(),
    type: 'MT760',
    title: 'Advice of Guarantee / Tripartite Lien Lock',
    senderBic: (bankName && bankName.includes('Punjab')) ? 'PUNBINBB001' : 'SBININBB001',
    receiverBic: 'AICTINBBXXX',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    fields: {
      '20': `TRX-${Math.floor(1e7 + Math.random() * 9e7)}-L760`,
      '23B': 'ISSUE',
      '31C': new Date().toISOString().split('T')[0].replace(/-/g, '').substring(2),
      '40C': 'URDG',
      '50': 'BHARATI VIDYA SANSTHAN, MUMBAI',
      '59': 'MEMBER SECRETARY, AICTE NEW DELHI',
      '32B': `INR ${(principal || 3500000).toLocaleString('en-IN')},00`,
      '77C': `TRIPARTITE LIEN SEALED UNCONDITIONALLY UNDER SFMS PROTOCOL FOR ${fdrRef || 'INSTRUMENT'}. NO ENCASHMENT WITHOUT AICTE WRO NOC.`
    },
    status: 'ACK_DELIVERED'
  };

  sfmsMessages.unshift(msg);

  // Chained block
  const lastBlock = auditChain[auditChain.length - 1];
  const newBlock = {
    index: auditChain.length + 1,
    title: `SFMS MT760 Lien Advice Dispatched: ${fdrRef || 'FDR'}`,
    timestamp: msg.timestamp,
    action: 'SFMS_MT760_DISPATCH',
    actor: `${bankName || 'State Bank of India'} SFMS Gateway Server`,
    previousHash: lastBlock.hash,
    data: {
      trx: msg.fields['20'],
      type: 'MT760',
      status: 'ACK_DELIVERED'
    }
  };
  newBlock.hash = generateSha256(newBlock.index + newBlock.timestamp + newBlock.previousHash + JSON.stringify(newBlock.data));
  auditChain.push(newBlock);

  res.status(201).json({ success: true, message: 'SFMS MT760 advice transmitted and acknowledged by Core Banking Gateway.', data: msg, block: newBlock });
});

router.post('/sfms/simulate-mt799', (req, res) => {
  const { fdrRef, balance } = req.body;
  const msg = {
    id: 'sfms-' + Date.now(),
    type: 'MT799',
    title: 'Free-Format Encumbrance & Balance Heartbeat',
    senderBic: 'SBININBB001',
    receiverBic: 'AICTINBBXXX',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    fields: {
      '20': `HBEAT-${Date.now()}`,
      '21': fdrRef || 'FDR-SBIN-2018-09',
      '79': `CORE BANKING HEARTBEAT CONFIRMED: PRINCIPAL BALANCE OF INR ${(balance || 3500000).toLocaleString('en-IN')} REMAINS ACTIVE & INVIOLATE UNDER AICTE LIEN.`
    },
    status: 'VERIFIED_ACTIVE'
  };

  sfmsMessages.unshift(msg);
  res.json({ success: true, message: 'MT799 non-encashment heartbeat verified.', data: msg });
});

// 7b. STATUTORY DOSSIERS & AFFIDAVITS REPOSITORY API
router.get('/dossiers', (req, res) => {
  const { page, limit, search, category, status } = req.query;
  let filtered = [...dossierDocs];

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.ref.toLowerCase().includes(q) ||
      d.docNo.toLowerCase().includes(q) ||
      (d.instituteName && d.instituteName.toLowerCase().includes(q)) ||
      (d.signatory && d.signatory.toLowerCase().includes(q))
    );
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(d => d.category === category);
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(d => d.status === status);
  }

  if (page && limit) {
    const p = Math.max(1, parseInt(page, 10));
    const l = Math.max(1, parseInt(limit, 10));
    const startIndex = (p - 1) * l;
    return res.json({
      success: true,
      total: filtered.length,
      page: p,
      limit: l,
      totalPages: Math.ceil(filtered.length / l),
      count: Math.min(l, filtered.length - startIndex),
      data: filtered.slice(startIndex, startIndex + l)
    });
  }

  res.json({ success: true, count: filtered.length, total: filtered.length, data: filtered });
});

router.post('/dossiers', (req, res) => {
  const newDoc = {
    id: 'doc-' + Date.now(),
    ref: req.body.ref || `DOC-${Date.now()}`,
    title: req.body.title || 'Uploaded Statutory Document',
    category: req.body.category || 'e_stamp',
    docNo: req.body.docNo || `DOC-NO-${Date.now()}`,
    fileSize: req.body.fileSize || '1.8 MB',
    dateUploaded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: req.body.status || 'Verified Valid',
    signatory: req.body.signatory || 'Authorized Officer, AICTE HQ',
    verified: true,
    instituteName: req.body.instituteName || 'Technical Institution',
    instituteCode: req.body.instituteCode || '1-1029384',
    state: req.body.state || 'Delhi'
  };

  dossierDocs.unshift(newDoc);
  res.status(201).json({ success: true, document: newDoc });
});

// 8. SCHOLARSHIP YIELD & REINVESTMENT ANALYTICS (Value-Add)
router.get('/analytics/scholarships', (req, res) => {
  res.json({ success: true, data: computeScholarshipYield(instruments) });
});
router.get('/analytics/yield', (req, res) => {
  res.json({ success: true, data: computeScholarshipYield(instruments) });
});

// 9. GEOSPATIAL REGIONAL COMPLIANCE MAP (Value-Add)
router.get('/analytics/regional', (req, res) => {
  res.json({ success: true, data: computeRegionalData(instruments) });
});
router.get('/analytics/regional-map', (req, res) => {
  res.json({ success: true, data: computeRegionalData(instruments) });
});

// 10. AI REGULATORY COPILOT / STATUTORY CHATBOT (Value-Add)
router.post('/copilot/query', (req, res) => {
  const { query } = req.body;
  const result = answerCopilotQuery({
    query: query || '',
    instruments,
    auditChain,
    sfmsMessages,
    dossierDocs,
    sanctionsList
  });
  res.json(result);
});

export default router;

