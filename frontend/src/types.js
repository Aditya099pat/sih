// AICTE Security Deposit & FDR Management Portal (PS26265)
// JSDoc Type Definitions and Constants

/**
 * @typedef {'dashboard'|'scrutiny'|'sanctions'|'escalation'|'calculator'|'audit'|'sfms'|'rpgf'|'register'|'scholarship'|'geospatial'|'affidavits'} NavigationTab
 */

export const NAVIGATION_TABS = [
  'dashboard',
  'scrutiny',
  'sanctions',
  'escalation',
  'calculator',
  'audit',
  'sfms',
  'rpgf',
  'register',
  'scholarship',
  'geospatial',
  'affidavits'
];

/**
 * @typedef {'trust'|'scrutiny'|'admin'|'bank'} UserRole
 */

export const USER_ROLES = {
  TRUST: 'trust',
  SCRUTINY: 'scrutiny',
  ADMIN: 'admin',
  BANK: 'bank'
};

/**
 * @typedef {Object} Instrument
 * @property {string} id
 * @property {string} ref
 * @property {string} instituteCode
 * @property {string} instituteName
 * @property {string} bankName
 * @property {string} branchName
 * @property {string} ifsc
 * @property {number} principalAmount
 * @property {number} accruedInterest
 * @property {string} statutoryStatus
 * @property {string} fdrReceiptNo
 * @property {string} sfmsReference
 */
