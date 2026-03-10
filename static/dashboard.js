let policies=[]

function login(){

let id=document.getElementById("customerId").value
let pass=document.getElementById("password").value

if(id==="123" && pass==="123"){

document.getElementById("loginSection").style.display="none"
document.getElementById("dashboardSection").style.display="block"

document.getElementById("customerName").innerText="Welcome Customer "+id

loadPolicies()

}
else{

alert("Invalid Login")

}

}


async function loadPolicies(){

const response=await fetch("/api/policies")

policies=await response.json()

updateKPIs()

renderCards()

}


function updateKPIs(){

let totalPolicies=policies.length

let totalUsed=0

let totalRemaining=0

policies.forEach(p=>{

totalUsed+=p.used_amount
totalRemaining+=p.remaining_balance

})

document.getElementById("totalPolicies").innerText=totalPolicies
document.getElementById("totalUsed").innerText="₹"+totalUsed
document.getElementById("totalRemaining").innerText="₹"+totalRemaining

}


function renderCards(){

let container=document.getElementById("cardsContainer")

container.innerHTML=""

let category=document.getElementById("filterCategory").value
let sort=document.getElementById("sortOption").value

let data=[...policies]

if(category!=="All"){
data=data.filter(p=>p.category===category)
}

if(sort==="name"){
data.sort((a,b)=>a.name.localeCompare(b.name))
}

if(sort==="balance"){
data.sort((a,b)=>a.remaining_balance-b.remaining_balance)
}

data.forEach(p=>{

let percent=(p.used_amount/p.total_limit)*100

let color="bg-success"

if(percent>50) color="bg-warning"
if(percent>80) color="bg-danger"

let card=`

<div class="col-lg-4 col-md-6 mb-4">

<div class="card shadow">

<div class="card-body">

<h5>${p.name}</h5>

<p>Total Limit: ₹${p.total_limit}</p>

<p>Used: ₹${p.used_amount}</p>

<p><b>Remaining: ₹${p.remaining_balance}</b></p>

<div class="progress mb-3">

<div class="progress-bar ${color}" style="width:${percent}%"></div>

</div>

<button class="btn btn-sm btn-outline-primary"
data-bs-toggle="collapse"
data-bs-target="#details${p.id}">
Details
</button>

<div class="collapse mt-3" id="details${p.id}">

<h6>Claims</h6>

<ul>
${p.claims.map(c=>`<li>${c.date} - ₹${c.amount} (${c.status})</li>`).join("")}
</ul>

<h6>Sub Limits</h6>

<ul>
${p.sub_limits.map(s=>`<li>${s.name} : ₹${s.limit}</li>`).join("")}
</ul>

<h6>Riders</h6>

<ul>
${p.riders.map(r=>`<li>${r.name}</li>`).join("")}
</ul>

</div>

</div>

</div>

</div>

`

container.innerHTML+=card

})

}


document.getElementById("filterCategory").addEventListener("change",renderCards)
document.getElementById("sortOption").addEventListener("change",renderCards)