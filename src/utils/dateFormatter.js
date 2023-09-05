export default function formatarData(data) {
   const dataObj = new Date(data);
   const dia = dataObj.getDate().toString().padStart(2, "0");
   const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
   const ano = dataObj.getFullYear().toString().slice(-2);

   return `${dia}/${mes}/${ano}`;
}
