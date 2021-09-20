export default function formatmoney(amount = 0){

	const options = {
		style: 'currency',
		currency: 'INR',
		minimumFrationDigits: 2
	}	
	if(amount % 100 === 0){
		options.minimumFrationDigits = 0;
	}
	const formatter = Intl.NumberFormat('en-US', options);

	return formatter.format(amount/10)
}