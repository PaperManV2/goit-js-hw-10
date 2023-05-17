import Notiflix from 'notiflix';

// export async function fetchCountries(name) {
//   await fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
//   )
//     .then(async Response => {
//       if (!Response.ok) {
//         if (Response.status == 404) {
//           Notiflix.Notify.failure('Oops, there is no country with that name');
//         }
//         throw new Error(Response.status);
//       }
//       return await Response.json();
//     })
//     .then(async data => {
//       console.log(data, data.length);
//       return await data;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

export async function fetchCountries(name) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    );
    if (!response.ok) {
      if (response.status == 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      throw new Error(response.status);
    }
    const countriesInfo = await response.json();
    return await countriesInfo;
  } catch (error) {
    console.error(error);
  }
}
