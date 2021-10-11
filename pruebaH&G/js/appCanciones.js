
const cargarDatos=async() =>{
    let artista=document.querySelector("#artista").value;
    let cancion=document.querySelector("#cancion").value;

    if(artista.trim()==='' || 
        cancion.trim()===''){
        mostrarError("#msj-error","Falta llenar campos");
        return;
    }

    const url_cancion=`https://api.lyrics.ovh/v1/${artista}/${cancion}`;  
    

    const url_artista=`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;   
    

    
    let divArtista=document.querySelector("#divArtista");
    let divCancion=document.querySelector("#divCancion");

    divArtista.innerHTML=`<center><h3>Cargando...</h3></center>`;
    divCancion.innerHTML=`<center><h3>Cargando...</h3></center>`;

    //variables
    const rLetra=await fetch(url_cancion);
    const resLetra=await rLetra.json();

    if(resLetra.error==="No lyrics found"){
        divCancion.innerHTML=`<p>No se encuentra la letra de la cancion</p>`;
        setTimeout(()=>{divCancion.innerHTML=``;},2000);
    }

    const rArtista=await fetch(url_artista);
    const resArtista=await rArtista.json();

    console.log(resLetra);
    console.log(resArtista);

    if(resArtista.artists===null){
        divArtista.innerHTML=`<p>No se encuentra el artista</p>`;
        setTimeout(()=>{divCancion.innerHTML=``;},2000);
        return;
    }

    let infoArtista=resArtista.artists[0];
    let letraCancion=resLetra.lyrics;

    //mostrar info del artista
    setTimeout(()=>{
        const{strArtistAlternate,strArtistThumb,strArtist,intFormedYear,strCountryCode,strGender,strBiographyEN,strBiographyES}=infoArtista;
        let bio=(strBiographyES===null)?strBiographyEN:strBiographyES;
        let facebook=(infoArtista.strFacebook==='')?``:`<a href="https://${infoArtista.strFacebook}" target="_blank" <i class="icon-facebook"></i></a>`; 
        let twitter=(infoArtista.strTwitter==='')?``:`<a href="https://${infoArtista.strTwitter}" target="_blank" <i class="icon-twitter"></i></a>`;
        
        let redesSociales=`${facebook} ${twitter}`;
        
        divArtista.innerHTML=`
        <div>
            <div class="titleText"><h1>Informacion del artista</h1></div>
            <div>
                <img src="${strArtistThumb}" alt="${strArtistAlternate}" class="imgBxx">
            
                <p class="info">Nombre Artistico: ${strArtist}</p>
                <p class="info">Año Nacimiento: ${intFormedYear}</p>
                <p class="info">Genero: ${strGender}</p>
                <p class="info">Pais: ${strCountryCode}</p>
                <div class="titleText"><h2>Biografia </h2></div>
                <p>${bio}</p>
                ${redesSociales}
            </div>
        </div>
        `;

        divCancion.innerHTML=`
        <div>
            <div class="titleText"><h1>Letra de la cancion</h1></div>
            <p class="letra">${letraCancion}</p>
        </div>
        `;

    },1000);
}

const borrarDatos=()=>{
    document.querySelector("#artista").value=``;
    document.querySelector("#cancion").value=``;
    document.querySelector("#divArtista").innerHTML=``;
    document.querySelector("#divCancion").innerHTML=``;
}



const mostrarError=(elemento, mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p>${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML=``;}, 2000);
}

