const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

const holidays = {
  2024: {
    off: [
      // 元旦
      "0101",
      // 春节
      "0209",
      "0210",
      "0211",
      "0212",
      "0213",
      "0214",
      "0215",
      "0216",
      "0217",
      // 清明
      "0404",
      "0405",
      "0406",
      // 劳动
      "0501",
      "0502",
      "0503",
      "0504",
      "0505",
      // 端午
      "0610",
      // 中秋
      "0915",
      "0916",
      "0917",
      // 国庆
      "1001",
      "1002",
      "1003",
      "1004",
      "1005",
      "1006",
      "1007",
    ],
    on: ["0204", "0218", "0407", "0428", "0511", "0914", "0929", "1012"],
  },
};

function main() {
  const current = dayjs();
  const year = current.year();

  // prefix
  let { off, on } = holidays[year];
  off = off.map((v) => `${year}${v}`);
  on = on.map((v) => `${year}${v}`);

  // for
  const result = {};
  let temp = dayjs().month(0).date(1);
  while (temp.year() === year) {
    const value = temp.format("YYYYMMDD");
    if (off.includes(value)) {
      result[value] = "off";
    } else if (on.includes(value)) {
      result[value] = "on";
    } else if ([0, 6].includes(temp.day())) {
      result[value] = "off";
    } else {
      result[value] = "on";
    }
    temp = temp.add(1, "day");
  }

  fs.writeFileSync(
    path.resolve(__dirname, `./${year}.json`),
    JSON.stringify(result, null, 2)
  );
}

main();
