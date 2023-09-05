module.exports = () => {
  fetch(
    `https://rest.coinapi.io/v1/exchanges?apikey=FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((finalResponse) => {
      return finalResponse;
    });
};
