{
	let arr = [];
	for( let i=0;i<10;i+=1 )
		arr.push(()=>i);

	//console.log(arr[2]());
}
// {}的作用配合里面的let相当于function（）{}（）；
{
	const myName = 'tangerine';
	//myName = 'apple';
	//console.log(myName);  //const 一旦声明无法改变
}
{
	let mine = {
		'name': 'tangerine',
		'sex': 'man'
	};
	let {name,sex} = mine;
	//console.log(name);console.log(sex);
	let [a,b,c] = [1,2,3];
	//console.log(a);console.log(b);console.log(c);
}
//字符串
{
	let str = 'tangerine';
	//for(let letter of str) console.log(letter);
	let json = {'name': 'apple'};
	// console.log(str.includes('ne'));
	// console.log(str.startsWith('tan'));
	// console.log(str.endsWith('ne'));
	let x3 = 'x'.repeat(3);
	//console.log(x3);
	let obj = {x: 1, y: 2},
		str2 = `${obj.x + obj.y}`;
	//console.log(str2);
	let name = `apple`,
		words = `i am ${name}`; //记住这里字符串外面的``不是平常的'';
	//console.log(words);
	let str3 = 
	`i
	am
	an
	apple
	`;
	//console.log(str3);
	let people = [{'name': 'tangerine','sex': 'man'},
				  {'name': 'apple','sex': 'woman'}
				 ];
	
	let tmpl = (data) => 
	`<ul>
	   ${data.map(item =>`
		    <li>${item.name}: ${item.sex}</li>
		    `).join('')
		}
	  </ul>
	`;
	//console.log(tmpl(people));
}