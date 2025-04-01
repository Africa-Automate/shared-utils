export function isLastDayOfMonth(): boolean {
  const nowUTC = new Date();
  // ⏰ Shift time to South African time (UTC+2)
  const SAST_OFFSET = 2 * 60 * 60 * 1000;
  const nowSAST = new Date(nowUTC.getTime() + SAST_OFFSET);
  const currentDate = nowSAST.getDate();
  const lastDate = new Date(
    nowSAST.getFullYear(),
    nowSAST.getMonth() + 1,
    0
  ).getDate();
  console.log(`🕒 [SAST] Now: ${nowSAST}`);
  console.log(`📅 Today: ${currentDate}, Last day of month: ${lastDate}`);
  return currentDate === lastDate;
}

export function isFirstDayOfMonth(): boolean {
  const nowUTC = new Date();
  // ⏰ Shift time to South African time (UTC+2)
  const SAST_OFFSET = 2 * 60 * 60 * 1000;
  const nowSAST = new Date(nowUTC.getTime() + SAST_OFFSET);
  const currentDate = nowSAST.getDate();

  console.log(`🕒 [SAST] Now: ${nowSAST}`);
  console.log(`📅 Today: ${currentDate}`);

  return currentDate === 1;
}
