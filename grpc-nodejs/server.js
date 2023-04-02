const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const packageDefinition = protoLoader.loadSync('protofile.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const myPackage = grpcObject.mypackage;

function createItem(call, callback) {
  const item = {
    name: call.request.name,
    description: call.request.description,
    price: call.request.price
  };
  db.collection('items').add(item)
    .then((docRef) => {
      item.id = docRef.id;
      console.log('Item created:', item);
      callback(null, item);
    })
    .catch((error) => {
      console.error(error);
      callback(error, null);
    });
}

// function readItem(call, callback) {
//   db.collection('items').doc(call.request.id).get()
//     .then((doc) => {
//       if (!doc.exists) {
//         const error = new Error('Item not found');
//         error.code = grpc.status.NOT_FOUND;
//         callback(error, null);
//       } else {
//         const item = doc.data();
//         item.id = doc.id;
//         console.log('Item read:', item);
//         callback(null, item);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       callback(error, null);
//     });
// }

function readItem(call, callback) {
    db.collection('items').doc(call.request.id).get()
      .then((doc) => {
        if (!doc.exists) {
          const error = new Error('Item not found');
          error.code = grpc.status.NOT_FOUND;
          callback(error, null);
        } else {
          const item = doc.data();
          item.id = doc.id;
          console.log('Item read:', item);
          callback(null, item);
        }
      })
      .catch((error) => {
        console.error(error);
        callback(error, null);
      });
  }
  
// function updateItem(call, callback) {
//   const item = {
//     name: call.request.name,
//     description: call.request.description,
//     price: call.request.price
//   };
//   db.collection('items').doc(call.request.id).update(item)
//     .then(() => {
//       item.id = call.request.id;
//       console.log('Item updated:', item);
//       callback(null, item);
//     })
//     .catch((error) => {
//       console.error(error);
//       callback(error, null);
//     });
// }

function updateItem(call, callback) {
    const item = {
      name: call.request.name,
      description: call.request.description,
      price: call.request.price
    };
    db.collection('items').doc(call.request.id).set(item, { merge: true })
      .then(() => {
        item.id = call.request.id;
        console.log('Item updated:', item);
        callback(null, item);
      })
      .catch((error) => {
        console.error(error);
        callback(error, null);
      });
  }
  
function deleteItem(call, callback) {
  db.collection('items').doc(call.request.id).delete()
    .then(() => {
      console.log('Item deleted:', call.request);
      callback(null, call.request);
    })
    .catch((error) => {
      console.error(error);
      callback(error, null);
    });
}

function main() {
    const server = new grpc.Server();
    server.addService(myPackage.ItemService.service, {
      CreateItem: createItem,
      ReadItem: readItem,
      UpdateItem: updateItem,
      DeleteItem: deleteItem
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server running at http://0.0.0.0:${port}`);
      server.start();
    });
  }
  

main()
