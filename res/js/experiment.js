
{/* <li><div class="task" id="_123">
<div class="check">
  <img class="" src="../svg/final/check.svg" alt="">
</div>
<div class="task-name">
  <p>Nganggur</p>
  <div></div>
</div>
<div class="date-created">
  <p>MMM/DD/YYYY</p>
</div>
<div class="due">
  <p>Due :</p><span class="space-1"> </span><p>Dec / 31 / 9999</p>
</div>
<div class="act-btns">
  <img class="info" src="../svg/final/info.svg" alt="">
  <img class="edit-self" src="../svg/final/edit.svg" alt="">
  <img class="delete-self" src="../svg/final/trash.svg" alt="">
</div>
<svg class="select" width="76" height="76" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">

  <clipPath id="clip">
    <rect width="200" height="200" />
  </clipPath>

  <svg x="-200">
    <path d="M0 0H160C182.091 0 200 17.9086 200 40V160C200 182.091 182.091 200 160 200H0V0Z" fill="#2958FF"/>
    <path d="M46.6667 88.3334L90 131.667L155 66.6667" stroke="#F2F2F2" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

</svg>
</div></li> */}

fetch('', { method: 'GET', mode: 'cors' }).then((val) => {

  const key = [...val.headers.keys()];

  [...val.headers.values()].forEach((val, i) => {

    console.log(`${key[i]}: ${val}`)

  })

})

console.log('test')