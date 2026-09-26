const LEVEL_ORDER = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

export const getUniqueLanguages = (teachers) => {
  const set = new Set();
  teachers.forEach((teacher) => teacher.languages.forEach((lang) => set.add(lang)));
  return Array.from(set).sort();
};

export const getUniqueLevels = (teachers) => {
  const set = new Set();
  teachers.forEach((teacher) => teacher.levels.forEach((level) => set.add(level)));
  return Array.from(set).sort(
    (a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b)
  );
};

export const getUniquePrices = (teachers) => {
  const set = new Set(teachers.map((teacher) => teacher.price_per_hour));
  return Array.from(set).sort((a, b) => a - b);
};