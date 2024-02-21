# Intern_Project

## Models

### Item fields

&nbsp;&nbsp;&nbsp;&nbsp;id : a unique identifier<br>
&nbsp;&nbsp;&nbsp;&nbsp;name : name of the item<br>
&nbsp;&nbsp;&nbsp;&nbsp;description : a description of the item<br>
&nbsp;&nbsp;&nbsp;&nbsp;quantity: the quantity of the item in the inventory<br>
&nbsp;&nbsp;&nbsp;&nbsp;timestamp : the lastly updated timestamp (it is generated in the backend)<br>

### Validations Rules

    Validations are checked by the server and if any incorrect format
    is send then a json object is sent to the clint such as {"message":"validation"}

<center><h3>Methods involving Item</h3></center>

#### GET /items

<hr>
<hr>

**Use Case :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;Gets all items from the inventory as a list of json objects

#### POST /items

<hr>
<hr>

**Use Case :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;to add a single item in the inventory
this transaction is recored automatically in the inventory

**How to use :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;with the api endpoint in the url
send a body with a json object which includes fields such as:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.name<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.description<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.quantity

**Validations :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;1.quantity must be a non-negative integer (sends "invalid value" message)

#### GET /items/:id

<hr>
<hr>

**Use Case:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;to get a single item from the inventory

**Validations :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)

#### PUT /items/:id

<hr>
<hr>

**Use Case :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;to update the item in the inventory
this transaction is recored automatically in the inventory

**How to Use :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;The body object should include fields such as name, description, quantity...since this is a "PUT" method
all the fields should be included in case of "PATCH" method only partial fields can be include

**Validations :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.quantity must be a non negitive integer (sends "invalid value" message)

#### DELETE /items/:id

<hr>
<hr>

**Use Case:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;to delete the item in the inventory by the id
this transaction is recored automatically in the inventory

**Validations :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)

<center><h3>Methods involving transactions</h3></center>

#### POST /items/:id/transactions

<hr>
<hr>

**Use Case:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;to add the transaction into the inventory

**How to use :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;the id in the url persisting in the inventory in optional
the body object must include fields<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.type<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.quantity

**Validations :**<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)

#### GET /items/:id/transactions

<hr>
<hr>

**Use Case:**<br>
&nbsp;&nbsp;&nbsp;&nbsp;to get all the transactions that include this id

**Validations :** <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)
