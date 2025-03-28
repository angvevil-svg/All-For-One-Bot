export default function firstUpperCase(string: string) {
  let newString = "";
  string
    .split(" ")
    .forEach(str => {
      if (str.length === 0)
        return newString += " ";

      return newString += `${str[0].toUpperCase()}${str.slice(1).toLowerCase()} `;
    });

  return newString;
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */