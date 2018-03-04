<!-- Convertkit Subcriber Plugin by ztobs -->
<script>

// Update the API keys and convertkit form Id
var squarespaceAPIKey = 'a85ed984-b2ff-4152-ac2b-022a3dd21e73';
var convertkitAPISecret = 'pQYo1VFJDyfM_Ahmlw5H10sz30kLJ9ym1MEH7TykOYw';
var convertkitFormId = 332991;

var urlParam = {};
location.search.substr(1).split("&").forEach(function(item) {urlParam[item.split("=")[0]] = item.split("=")[1]})

var z_url = 'https://api.squarespace.com/1.0/commerce/orders/'+urlParam.oid;
var z_proxy = 'https://cors-anywhere.herokuapp.com/';
var z_cart, z_email, z_first_name, z_last_name;
var z_productNames = [];


fetch(z_proxy+z_url, {
  mode: 'cors',
  method: 'GET',
  credentials: 'same-origin',
  headers: {
          'Authorization': 'Bearer ' + squarespaceAPIKey
        }
 })
.then( ( response ) => {
   return response.json();
 }).then( ( z_cart ) => {
   	var z_items = z_cart['lineItems'];

	z_items.forEach(function(element){ z_productNames.push(element.productName);})
	z_email = z_cart.customerEmail;
	z_first_name = z_cart.billingAddress.firstName;
	z_last_name = z_cart.billingAddress.lastName;

	var udata = new FormData();
	udata.append("email", z_email);
	udata.append("fields[product_name]", z_productNames.toString());
	udata.append("first_name", z_first_name);
	udata.append("fields[last_name]", z_last_name);

	 fetch("https://api.convertkit.com/v3/forms/"+convertkitFormId+"/subscribe?api_secret="+convertkitAPISecret, {
	   mode: 'cors',
	method: 'POST',
	body: udata
	 }).then( ( response ) => {
	   return response.json();
	 }).then( ( json ) => {
	   console.log( json);
	 });
 })
 </script>