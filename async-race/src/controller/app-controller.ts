export function createGarageView():HTMLDivElement{
   const garage =document.createElement('div');
   const title = document.createElement("h1");
   title.textContent = 'Garage';
   garage.append(title);
   return garage
}
