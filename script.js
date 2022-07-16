const fileinput = document.querySelector('.input-file');
const filtername=document.querySelector('.filter-info .name');
const filtervalue=document.querySelector('.filter-info .value');
const filterslider=document.querySelector('.slider input');
const previewimg= document.querySelector('.img-preview img');
const resetfilters= document.querySelector('.reset-filters');
const filteroptions= document.querySelectorAll('.filter button');
const rotateoptions= document.querySelectorAll('.rotate button');
const savebtn= document.querySelector('.save-img');
const chooseimgbtn= document.querySelector('.choose-img');

let brightness = 100 , saturation = 100 , inversion = 0, grayscale = 0 , rotation = 0,horizontal=1, vertical = 1;

const applyfilters = () =>{
    let filters = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    previewimg.style.filter = filters;
    previewimg.style.transform = `rotate(${rotation}deg) scale(${horizontal} , ${vertical})`;
}

const loadImage = () => {
    let file = fileinput.files[0]; //getting user selected files
    if(!file) return; //if the user cancel choosing
    previewimg.src = URL.createObjectURL(file);
    previewimg.addEventListener('load', () => {
        document.querySelector('.container').classList.remove('disable');
    });
}



const updateFilter = () =>{
    filtervalue.innerText = filterslider.value +'%';
    const selectedfilter = document.querySelector('.filter .active');
    
    switch (selectedfilter.id) {
        case 'brightness':
            brightness = filterslider.value;
            break;
        case 'saturation':
            saturation = filterslider.value;
                break;
        case 'inversion':
            inversion = filterslider.value;
                break;
        case 'grayscale':
            grayscale = filterslider.value;
                break;
        
        default:
            break;
    }
    applyfilters();
}

rotateoptions.forEach(option =>{
    option.addEventListener('click' , () =>{
        switch (option.id) {
            case 'left':
                rotation-=90;
            break;
            case 'right':
                rotation+=90;
            break;
            case 'vertical':
                vertical = vertical == 1 ? -1 : 1;
            break;
            case 'horizontal':
                horizontal = horizontal == 1 ? -1 : 1;
            break;
            default:
                break;
        }
        applyfilters();
    })
})



filteroptions.forEach(option => {
    option.addEventListener('click',()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filtername.innerText= option.innerText;

        switch (option.id) {
            case 'brightness':
                filterslider.max='200';
                filtervalue.innerText = brightness ;
                filterslider.value = brightness ;
                break;
            case 'saturation':
                filterslider.max='200';
                filtervalue.innerText = saturation ;
                filterslider.value = saturation ;
                break;
            case 'inversion':
                filterslider.max='100';
                filtervalue.innerText = inversion ;
                filterslider.value = inversion ;
                break;
            case 'grayscale':
                filterslider.max='100';
                filtervalue.innerText = grayscale ;
                filterslider.value = grayscale ;
                break;
            
            default:
                break;
        }

    });
});

resetfilters.addEventListener('click',() =>{

    brightness=100 , saturation = 100 ;
    inversion = 0 , grayscale = 0 , rotation = 0;
    horizontal = 1 , vertical = 1;
    filteroptions[0].click();
    applyfilters();

});

const SaveImg = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewimg.naturalWidth;
    canvas.height=previewimg.naturalHeight;



    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);


    
    
    if (rotation !== 0) {
        ctx.rotate(rotation * Math.PI / 180);
    }

    ctx.scale(horizontal,vertical);


    ctx.drawImage(previewimg , -canvas.width / 2, -canvas.height /2 , canvas.width , canvas.height);
    

    const link = document.createElement('a');
    link.download= 'image.jpg';
    link.href= canvas.toDataURL();
    link.click();
}

fileinput.addEventListener('change', loadImage);
filterslider.addEventListener('change' , updateFilter);
chooseimgbtn.addEventListener('click',() => fileinput.click());
savebtn.addEventListener('click',SaveImg);
