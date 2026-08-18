export const COUNTRY_CALLING_CODES = [
  { country: "Kenya", iso: "KE", callingCode: "+254" },
  { country: "Uganda", iso: "UG", callingCode: "+256" },
  { country: "Tanzania", iso: "TZ", callingCode: "+255" },
  { country: "Rwanda", iso: "RW", callingCode: "+250" },
  { country: "Burundi", iso: "BI", callingCode: "+257" },
  { country: "South Sudan", iso: "SS", callingCode: "+211" },
  { country: "Ethiopia", iso: "ET", callingCode: "+251" },
  { country: "Somalia", iso: "SO", callingCode: "+252" },
  { country: "DR Congo", iso: "CD", callingCode: "+243" },
  { country: "South Africa", iso: "ZA", callingCode: "+27" },
  { country: "Nigeria", iso: "NG", callingCode: "+234" },
  { country: "Ghana", iso: "GH", callingCode: "+233" },
  { country: "Egypt", iso: "EG", callingCode: "+20" },
  { country: "Zambia", iso: "ZM", callingCode: "+260" },
  { country: "Zimbabwe", iso: "ZW", callingCode: "+263" },
  { country: "Malawi", iso: "MW", callingCode: "+265" },
  { country: "Mozambique", iso: "MZ", callingCode: "+258" },
  { country: "Botswana", iso: "BW", callingCode: "+267" },
  { country: "Namibia", iso: "NA", callingCode: "+264" },
  { country: "United Kingdom", iso: "GB", callingCode: "+44" },
  { country: "United States / Canada", iso: "US", callingCode: "+1" },
  { country: "United Arab Emirates", iso: "AE", callingCode: "+971" },
  { country: "Saudi Arabia", iso: "SA", callingCode: "+966" },
  { country: "India", iso: "IN", callingCode: "+91" },
  { country: "Pakistan", iso: "PK", callingCode: "+92" },
  { country: "Australia", iso: "AU", callingCode: "+61" },
  { country: "Germany", iso: "DE", callingCode: "+49" },
  { country: "France", iso: "FR", callingCode: "+33" },
  { country: "Netherlands", iso: "NL", callingCode: "+31" },
  { country: "Italy", iso: "IT", callingCode: "+39" },
  { country: "Spain", iso: "ES", callingCode: "+34" },
  { country: "Sweden", iso: "SE", callingCode: "+46" },
  { country: "Norway", iso: "NO", callingCode: "+47" },
  { country: "China", iso: "CN", callingCode: "+86" },
  { country: "Japan", iso: "JP", callingCode: "+81" },
] as const;

export function normalizePhoneNumber(countryCode: string, value: string) {
  const callingCode = countryCode.replace(/\D/g, "");
  const digits = value.replace(/\D/g, "");
  const numberWithoutPrefix = digits.startsWith(callingCode)
    ? digits.slice(callingCode.length)
    : digits;
  const localNumber = numberWithoutPrefix.startsWith("0")
    ? numberWithoutPrefix.slice(1)
    : numberWithoutPrefix;

  return `+${callingCode}${localNumber}`;
}
