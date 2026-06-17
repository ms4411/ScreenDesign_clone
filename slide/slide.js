//css 자동 적용
let link=document.createElement('link');
link.rel='stylesheet';
link.href='/slide/slide.css'
document.querySelector('head').appendChild(link);

moveCnt=1;
let imgNum=document.querySelector(".slide-track").childElementCount;
let trackWidth=document.querySelector(".slide-box").clientWidth*imgNum;
const imgWidth=trackWidth/imgNum;

document.querySelector(".slide-track").style.width=`${trackWidth}px`
for (const element of document.querySelectorAll(".slide-track>*")) {
    element.style.width=`${imgWidth}px`
}

// 새로운 트랙 생성(복제)
function newSlide(){
    let cloneTrack=document.querySelector(".slide-track")
        .cloneNode(true);
    document.querySelector(".slide-box").appendChild(cloneTrack);
    cloneTrack.style.transform=`translateX(${imgWidth*moveCnt*-1+trackWidth*2}px)`;
    return cloneTrack;
}
newSlide();

// 슬라이드 안 이미지 변경 용도
function changeImages(Images){
    for (const element of document.querySelectorAll(".slide-track")) {
        element.remove()
    }
    let slideTrack=document.createElement("div")
    for (const contryImg of Images) {
        let image=document.createElement("img")
        image.src=contryImg
        slideTrack.appendChild(image)
    }
    
    slideTrack.classList.add("slide-track")
    document.querySelector(".slide-box").appendChild(slideTrack)
    newSlide()
    for (const element of document.querySelectorAll(".slide-track>*")) {
        element.style.width=`${imgWidth}px`
    }
    imgNum=Images.length
    trackWidth=imgWidth*imgNum
    moveCnt=1
}

// 자동 넘김
setInterval(()=>{
    let tracks=[...document.querySelectorAll(".slide-track")];
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].style.transform=`translateX(${imgWidth*moveCnt*-1+trackWidth*i}px)`;
    }
    if(imgNum<moveCnt){
        tracks.shift().remove()
        newSlide()
        moveCnt=1;
    }
    moveCnt+=1;
    console.log(imgNum)
}, 1000)