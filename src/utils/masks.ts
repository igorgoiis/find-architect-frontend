export const maskPhone = (value: string) => {
  let result = value.replace(/\D/g, '');
  result = result.replace(/^0/, '');
  if (result.length > 10) {
    // 11+ digits. Format as 5+4.
    result = result.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (result.length > 5) {
    // 6..10 digits. Format as 4+4
    result = result.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (result.length > 2) {
    // 3..5 digits. Add (..)
    result = result.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    // 0..2 digits. Just add (
    result = result.replace(/^(\d*)/, '($1');
  }

  return result;
};
