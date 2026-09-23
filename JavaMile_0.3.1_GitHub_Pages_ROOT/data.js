// Replace this provider with location/menu APIs; preserve provenance and null unknowns.
export const brand = {name:'JavaMile',tagline:'Find a drink worth the trip.'};
export const choices={temperature:['Iced','Hot','Either'],sweetness:['Unsweetened','Lightly sweet','Sweet','Any'],strength:['Smooth','Balanced','Bold','Any'],milk:['Oat','Dairy','Almond','None','Any'],caffeine:['Regular','Decaf','Caffeine-free','Any'],budget:['Any budget','Under $5','Under $7']};
export const defaults={temperature:'Iced',sweetness:'Lightly sweet',strength:'Balanced',milk:'Oat',caffeine:'Regular',budget:'Any budget'};
const rows=[
['oat','Iced vanilla oat latte','Daybreak Coffee','0.3','Iced','Lightly sweet','Balanced','Oat','Regular',5.75,'Vanilla, espresso & a silky oat finish.','latte',0],
['honey','Honey oat latte','Sunday House','0.6','Hot','Lightly sweet','Balanced','Oat','Regular',6,'Warm honey notes, mellow espresso, creamy oat milk.','latte',1],
['cold','Oat cold brew','Common Ground','0.8','Iced','Unsweetened','Bold','Oat','Regular',null,'Slow-steeped coffee with a splash of oat milk.','cold brew',2],
['flat','Flat white','Sunday House','0.6','Hot','Unsweetened','Bold','Dairy','Regular',4.75,'A short, espresso-forward cup with silky milk.','flat white',1],
['caramel','Iced caramel latte','Common Ground','0.8','Iced','Sweet','Balanced','Dairy','Regular',6.25,'Caramel sweetness and espresso over ice.','latte',0],
['decaf','Decaf oat latte','Daybreak Coffee','0.3','Hot','Unsweetened','Smooth','Oat','Decaf',5.5,'A mellow, milk-forward decaf espresso drink.','latte',1],
['choc','Iced chocolate almond latte','Sunday House','0.6','Iced','Sweet','Balanced','Almond','Regular',6.5,'Chocolate and almond milk with espresso.','mocha',0],
['herbal','Mint herbal tea','Common Ground','0.8','Hot','Unsweetened','Smooth','None','Caffeine-free',4,'Fresh mint notes, without coffee or caffeine.','tea',1],
['black','Cold brew','Daybreak Coffee','0.3','Iced','Unsweetened','Bold','None','Regular',4.5,'A full-bodied black coffee served over ice.','cold brew',2]
];
export const drinks=rows.map(([id,name,cafe,distance,temperature,sweetness,strength,milk,caffeine,price,description,family,image])=>({id,name,cafe,distance,temperature,sweetness,strength,milk,caffeine,price,description,family,image,isSample:true,priceVerified:false,source:'Fictional prototype menu',lastChecked:null,availability:null}));
export const provider={async list(){return {drinks,mode:'sample',location:'Demo neighborhood',liveConnected:false}}};
export function rank(items,p){return items.filter(d=>(p.caffeine==='Any'||d.caffeine===p.caffeine)&&(p.milk==='Any'||d.milk===p.milk)&&(p.budget==='Any budget'||(d.price!==null&&d.price<Number(p.budget.replace(/\D/g,''))))).map(d=>({...d,score:['temperature','sweetness','strength'].reduce((n,k)=>n+(p[k]===d[k]?3:0),0)})).sort((a,b)=>b.score-a.score);}
export function compareUsual(input){const t=input.toLowerCase();const family=/mocha|chocolate/.test(t)?'mocha':/cold brew/.test(t)?'cold brew':/flat white/.test(t)?'flat white':/latte|macchiato|cappuccino/.test(t)?'latte':/tea/.test(t)?'tea':null;if(!family)return null;const attrs={family,...(/iced|cold/.test(t)?{temperature:'Iced'}:/hot/.test(t)?{temperature:'Hot'}:{}),...(/oat/.test(t)?{milk:'Oat'}:/almond/.test(t)?{milk:'Almond'}:{}),...(/decaf/.test(t)?{caffeine:'Decaf'}:{}),...(/vanilla|caramel|mocha/.test(t)?{sweetness:/caramel|mocha/.test(t)?'Sweet':'Lightly sweet'}:{})};return drinks.filter(d=>d.family===family&&(!attrs.caffeine||d.caffeine===attrs.caffeine)).map(d=>({...d,score:Object.entries(attrs).filter(([k,v])=>d[k]===v).length,similarities:Object.entries(attrs).filter(([k,v])=>d[k]===v).map(([k,v])=>k==='family'?`${v} style`:v.toLowerCase())})).sort((a,b)=>b.score-a.score).slice(0,3);}
