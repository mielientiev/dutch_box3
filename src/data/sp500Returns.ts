// S&P 500 Historical Annual Returns (1928-2026)
// Values are decimal percentages (e.g., 0.3788 = 37.88%)
export const SP500_RETURNS: Record<number, number> = {
  1928: 0.3788,
  1929: -0.1191,
  1930: -0.2848,
  1931: -0.4707,
  1932: -0.1515,
  1933: 0.4659,
  1934: -0.0594,
  1935: 0.4137,
  1936: 0.2792,
  1937: -0.3859,
  1938: 0.2521,
  1939: -0.0545,
  1940: -0.1529,
  1941: -0.1786,
  1942: 0.1243,
  1943: 0.1945,
  1944: 0.138,
  1945: 0.3072,
  1946: -0.1187,
  1947: 0,
  1948: -0.0065,
  1949: 0.1026,
  1950: 0.2178,
  1951: 0.1646,
  1952: 0.1178,
  1953: -0.0662,
  1954: 0.4502,
  1955: 0.264,
  1956: 0.0262,
  1957: -0.1431,
  1958: 0.3806,
  1959: 0.0848,
  1960: -0.0297,
  1961: 0.2313,
  1962: -0.1181,
  1963: 0.1889,
  1964: 0.1297,
  1965: 0.0906,
  1966: -0.1309,
  1967: 0.2009,
  1968: 0.0766,
  1969: -0.1136,
  1970: 0.001,
  1971: 0.1079,
  1972: 0.1563,
  1973: -0.1737,
  1974: -0.2972,
  1975: 0.3155,
  1976: 0.1915,
  1977: -0.115,
  1978: 0.0106,
  1979: 0.1231,
  1980: 0.2577,
  1981: -0.0973,
  1982: 0.1476,
  1983: 0.1727,
  1984: 0.014,
  1985: 0.2633,
  1986: 0.1462,
  1987: 0.0203,
  1988: 0.124,
  1989: 0.2725,
  1990: -0.0656,
  1991: 0.2631,
  1992: 0.0446,
  1993: 0.0706,
  1994: -0.0154,
  1995: 0.3411,
  1996: 0.2026,
  1997: 0.3101,
  1998: 0.2667,
  1999: 0.1953,
  2000: -0.1014,
  2001: -0.1304,
  2002: -0.2337,
  2003: 0.2638,
  2004: 0.0899,
  2005: 0.03,
  2006: 0.1362,
  2007: 0.0353,
  2008: -0.3849,
  2009: 0.2345,
  2010: 0.1278,
  2011: 0,
  2012: 0.1341,
  2013: 0.296,
  2014: 0.1139,
  2015: -0.0073,
  2016: 0.0954,
  2017: 0.1942,
  2018: -0.0624,
  2019: 0.2888,
  2020: 0.1626,
  2021: 0.2689,
  2022: -0.1944,
  2023: 0.2423,
  2024: 0.2331,
  2025: 0.1639,
  2026: 0.0099,
};

export const SP500_MIN_YEAR = 1928;
export const SP500_MAX_YEAR = 2026;

export function getReturnForYear(year: number): number {
  const rate = SP500_RETURNS[year];
  if (rate === undefined) {
    throw new Error(`No S&P 500 data available for year ${year}`);
  }
  return rate;
}

export function validateYearRange(
  startYear: number,
  endYear: number
): { valid: true } | { valid: false; error: string } {
  if (startYear < SP500_MIN_YEAR) {
    return {
      valid: false,
      error: `Start year must be ${SP500_MIN_YEAR} or later`,
    };
  }

  if (endYear > SP500_MAX_YEAR) {
    return {
      valid: false,
      error: `End year must be ${SP500_MAX_YEAR} or earlier`,
    };
  }

  if (endYear < startYear) {
    return {
      valid: false,
      error: `End year must be greater than or equal to start year`,
    };
  }

  return { valid: true };
}

export function getYearsFromRange(startYear: number, endYear: number): number {
  return endYear - startYear + 1;
}
