/**
 * @group1 name of template
 * @group2 description for template
 *
 * @example exports[`templates/AddUserToWorkshop renders email subject 1`]
 *
 * Matches all snapshots descriptions containing html
 */
export const SNAPSHOT_DESCRIPTION = /exports\[`\w+\/([A-Za-z]+)\s([\w,;"\s]+)\`][\s|\S]*?<!doctype\shtml>/gm;
/**
 * @group1 the html
 *
 * Matches all html
 */
export const SNAPSHOT_HTML = /(<!doctype\shtml>\s*<html[\s|\S]*?<\/html>)/gm;
