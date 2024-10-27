let array = []
const div_arrays = document.querySelector('.array')
const div_merge = document.querySelector('.merge')
const div_results = document.querySelector('.results')
function renderArrays(){
    div_arrays.innerHTML=""
    div_merge.innerHTML=""
    div_results.innerHTML=""
    array.forEach(arr=>{
        const d = document.createElement('div')
        d.classList.add('box'); 
        d.setAttribute('id','box')
        d.setAttribute('value',`${arr}`)
        d.style.height=`${arr}vh`
        div_arrays.appendChild(d)
    })
}
function generateArray(){
    div_arrays.innerHTML=''
    array =[]
    for(let i=0;i<20;i++){
        const random = Math.round(1+ Math.random()*75)
        array.push(random)
    }
    renderArrays()
    
    
    
}
document.getElementById('size').addEventListener('input',(e)=>{
    increaseSize(e.target.value)
})

function increaseSize(size){
    console.log(size)
    if (size < array.length){
        console.log('less than')
        for(let i =0;i<size;i++){
            array.pop()
        }
    }
    else{
        console.log('greater than')
        const diff = size -array.length 
        console.log(diff)
        for (let i=0 ;i<diff;i++){
            const random = Math.round(1+ Math.random()*75)
            array.push(random)
        }
        renderArrays()
    }

}
function showArray(){
    console.log(array)
}

// function bubbleSort(){
//     let temp = 0;
//     for (let i = 0; i < array.length - 1; i++) {
//         for (let j = 0; j < array.length - i - 1; j++) {
//             if (array[j] > array[j + 1]) {
//                 temp = array[j];
//                 array[j] = array[j + 1];
//                 array[j + 1] = temp;
//             }
//         }
//     }
// }

// Delay function to create a pause in the sorting process
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    let temp = 0;
    const divs = document.querySelectorAll('.array div'); // Select all divs representing array elements

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            // Highlight the elements being compared
            divs[j].classList.add('comparing');
            divs[j + 1].classList.add('comparing');
            await sleep(150); // Delay for comparison

            if (array[j] > array[j + 1]) {
                // Swap elements in the array
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update the heights in the DOM to reflect the swap
                divs[j].style.height = `${array[j]}vh`;
                divs[j + 1].style.height = `${array[j + 1]}vh`;

                // Highlight the swapped elements
                divs[j].classList.add('not-sorted');
                divs[j + 1].classList.add('not-sorted');
                await sleep(150); // Delay for swap
            }

            // Remove comparison colors
            divs[j].classList.remove('comparing');
            divs[j + 1].classList.remove('comparing');
            divs[j].classList.remove('not-sorted');
            divs[j + 1].classList.remove('not-sorted');
        }

        // Mark the last element of this pass as sorted
        divs[array.length - 1 - i].classList.add('sorted');
    }

    // Mark all elements as sorted at the end
    divs[0].classList.add('sorted');
}


/*
merge sort 
28,32,54,11,4,76,89,97,12,5
1st pass
left                right
28,32,54,11,4   76,89,97,12,5

2nd pass
left  right 
28,32  





*/


// function mergeSort(ar) {    
//     if (ar.length <= 1) {
//         return ar; 
//     }
//     const mid = Math.floor(ar.length / 2);
//     console.log(mid);
//     const left = ar.slice(0, mid);
//     const right = ar.slice(mid);
//     console.log('Left : ' + left);
//     console.log('Right : ' + right);

//     return merge(mergeSort(left), mergeSort(right));
// }

// function merge(left, right) {    
//     let result = [], i = 0, r = 0;
//     while (i < left.length && r < right.length) {        
//         if (left[i] < right[r]) {            
//             result.push(left[i]);
//             i++;
//         } else {            
//             result.push(right[r]);
//             r++;
//         }
//     }
//     return result.concat(left.slice(i)).concat(right.slice(r));
// }
async function mergeSort(){
    array = MergeSort(array,document.querySelector('.array'))
}

async function MergeSort(array, container) {
    if (array.length <= 1) {
        return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

 
    const splitContainer = document.createElement('div');
    splitContainer.classList.add('split-container');
    container.appendChild(splitContainer);

   
    await hightLightSplit(left, right, splitContainer);

    
    const l = await MergeSort(left, splitContainer);
    const r = await  MergeSort(right, splitContainer);
    return  await merge(l,r)
}
async function hightLightSplit(left, right, container) {
    const divs = document.querySelectorAll('.box');
    

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-array');
    container.appendChild(leftContainer);

    for (let i = 0; i < left.length; i++) {
        await sleep(120); 
        leftContainer.appendChild(divs[i].cloneNode(true));  
    }

  
    const l_boxes = leftContainer.querySelectorAll('.box');
    for (let i = 0; i < left.length; i++) {
        await sleep(120); 
        l_boxes[i].classList.add('l');
    }

    
    const gap = document.createElement('div');
    gap.style.width = '10px';  
    container.appendChild(gap);


    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-array');
    container.appendChild(rightContainer);

    for (let i = left.length; i < left.length + right.length; i++) {
        await sleep(120); 
        rightContainer.appendChild(divs[i].cloneNode(true));  
    }


    const r_boxes = rightContainer.querySelectorAll('.box');
    for (let i = 0; i < right.length; i++) {
        await sleep(120); 
        r_boxes[i].classList.add('r');
    }
}
async function merge(left, right) {
    const m = document.querySelector('.merge')
    const rs = document.querySelector('.results')
    
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-array');
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-array');
    const box = document.createElement('div')
    box.classList.add('b')
    let l = 0;
    let r = 0;
    let result = [];
    left.forEach(l=>{
    const d = document.createElement('div')

    d.classList.add('box'); 
    d.classList.add('l'); 
    d.setAttribute('id','box')
    d.setAttribute('value',`${l}`)
    d.style.height=`${l}vh`
    leftContainer.appendChild(d)
    })
    right.forEach(r=>{
        const d = document.createElement('div')
        d.classList.add('box');
        d.classList.add('r');  
        d.setAttribute('id','box')
        d.setAttribute('value',`${r}`)
        d.style.height=`${r}vh`
        rightContainer.appendChild(d)
        })
        box.appendChild(leftContainer)
        const gap = document.createElement('div')
        gap.style.width='10px'
        box.appendChild(gap)
        box.appendChild(rightContainer)
    
    m.appendChild(box); 

    while(l<left.length && r<right.length){
        console.log(l)
        const d = document.createElement('div')
        d.classList.add('box');
        if(left[l] < right[r]){
            await sleep(220)
            d.classList.add('l');
            d.setAttribute('value',`${left[l]}`)
            d.style.height=`${left[l]}vh`
            rs.appendChild(d)
            result.push(left[l])
            l++
        }
        else{
            await sleep(220)
            d.classList.add('r');
            d.setAttribute('value',`${right[r]}`)
            d.style.height=`${right[r]}vh`
            rs.appendChild(d)
            result.push(right[r])
            r++

        }

            
    }
    const rsl = result.concat(left.slice(l)).concat(right.slice(r))
    rsl.forEach(async(r)=>{
        await sleep(220)
        const d = document.createElement('div')
        d.classList.add('box');
        d.classList.add('sorted')
        d.setAttribute('value',`${r}`)
        d.style.height=`${r}vh`
        rs.appendChild(d)
    })
    return rsl 
   
}

