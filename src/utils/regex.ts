/**
 * @group1 name of template
 * @group2 description for template
 *
 * @example exports[`templates/AddUserToWorkshop renders email subject 1`]
 *
 * Matches all snapshots descriptions containing html
 */
export const SNAPSHOT_DESCRIPTION = /exports\[`\w+\/[A-Za-z]+\s([\w,;"\s]+)\s[0-9]{1}\`][\s|\S]*?<!doctype\shtml>/gm;

/**
 * Matches all html
 */
export const SNAPSHOT_HTML = /<!doctype[\s\S]*?<\/html>/gm;

/**
 * Matches every test case containing html
 */
export const SNAPSHOT = /exports[\s|\S]*?(<!doctype[\s\S]*?<\/html>)/gm;
