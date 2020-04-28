conn = new Mongo();

// Create the tarsier_users database if not already created
db = conn.getDB('tarsier_users');

// Drop the existing user if already created
print('Dropping User tarsier...');
cursor = db.dropUser('tarsier');
print(cursor);

// Create the user that will be used to connect to the datasource
print('Creating User tarsier...');
db.createUser(
    {
        user: 'tarsier',
        pwd: 'tarsier',
        roles: [
            { role: "readWrite", db: "tarsier_users" }
        ]
    }
);

// Clear out any existing collection data
print('Dropping Collection user...');
cursor = db.user.drop();
print(cursor);

// Create our test user
print('Inserting a test user...');
db.user.insertOne({
    username: 'test',
    password: '68162530b80469d26473cd73ac198906301201d64954decf7aeb00130c77f9ad',
    isActive: 'true',
    firstName: 'Test',
    lastName: 'Testerson',
    salt: "c3e4a0050c539362d56f4b40eec2e9aa1c95b31cb90319a1f48225359ca3744c38bb1bfa0511aff7165c1cd315247ed4a24a046e329fbe1467d07cac5360a1b7bd1899c37da6d42ab7efddd3e2f925d3250dad89929ec04bc9daa947a38f14eabe58c4fceaad8067657ff5c7976f8fedc9d8cd117bbcd266b5056065755aa25c8d47b3dc2c759788a07d6c212b3cf86cba0be3ddbcfcd2ec5c53c55c75face001485474e5f779f739ce685d884b6d12697b70967d02b4fe37a6ed3cda79aafa5d2aa9a8d6a1639db20dab1a4d4240055bb1be3752938f8f87186a9b3f0c24cd2c9b38c5c16d105446f1c2db4b10c7d8e8a7d9049c0558dbbb50c67d8d573a521"
});

cursor = db.user.findOne();
printjson(cursor);
