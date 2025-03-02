export default async function getLinkResponse(url: string) {
  try {
    let data = await fetch(url, {
      headers: {
        Authorization: "Basic MDE1NDQ1NTM1NDU0NDU1MzU0RDY6"
      }
    }).then(res => res.json());
    return data;
  } catch (e) {
    console.error(e)
  }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */