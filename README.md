# Intern_Project

## Models

### Item fields

id : a unique identifier
name : name of the item
description : a description of the item
quantity: the quantity of the item in the inventory
timestamp : the lastly updated timestamp (it is generated in the backend)

### Validations Rules

    Validations are checked by the server and if any incorrect format
    is send then a json object is sent to the clint such as {"message":"validation"}

<center><h3>Methods involving Item</h3></center>

#### GET /items

<hr>
<hr>

**Use Case :**
Gets all items from the inventory as a list of json objects

#### POST /items

<hr>
<hr>

**Use Case :**
to add a single item in the inventory
this transaction is recored automatically in the inventory

**How to use :**
with the api endpoint in the url
send a body with a json object which includes fields such as:
1.name
2.description
3.quantity

**Validations :**
1.quantity must be a non-negative integer (sends "invalid value" message)

#### GET /items/:id

<hr>
<hr>

**Use Case:**
to get a single item from the inventory

**Validations :**
1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)

#### PUT /items/:id

<hr>
<hr>

**Use Case :**
to update the item in the inventory
this transaction is recored automatically in the inventory

**How to Use :**
The body object should include fields such as name, description, quantity...since this is a "PUT" method
all the fields should be included in case of "PATCH" method only partial fields can be include

**Validations :**
1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)
2.quantity must be a non negitive integer (sends "invalid value" message)

#### DELETE /items/:id

<hr>
<hr>

**Use Case:**
to delete the item in the inventory by the id
this transaction is recored automatically in the inventory

**Validations :**
1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)

<center><h3>Methods involving transactions</h3></center>

#### POST /items/:id/transactions

<hr>
<hr>

**Use Case:**
to add the transaction into the inventory

**How to use :**
the id in the url persisting in the inventory in optional
the body object must include fields
1.type
2.quantity

**Validations :**
1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)

#### GET /items/:id/transactions

<hr>
<hr>

**Use Case:**
to get all the transactions that include this id

**Validations :**  
1.id in the url must be a mangodbID and it should persist in the inventory (sends "invalid id" message)
