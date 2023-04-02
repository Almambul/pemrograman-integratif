const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('protofile.proto');
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const myPackage = grpcObject.mypackage;

const client = new myPackage.ItemService('localhost:50051', grpc.credentials.createInsecure());

function createItem() {
  const item = {
    name: 'Alat Tulis Kantor',
    description: 'Berhasil menambah data inventaris',
    price: 50.5
  };
  client.CreateItem(item, (error, response) => {
    if (error) {
      console.error(error.details);
    } else {
      console.log('Item created:', response);
    }
  });
}

function readItem() {
    const item = {
      //id -> disesuaikan dengan ID database
      id: 'CF09tkT1lonQDb2Yh3xz'
    };
    client.ReadItem(item, (error, response) => {
      if (error) {
        console.error(error.details);
      } else {
        console.log('Item read:', response);
      }
    });
  }

function updateItem() {
  const item = {
    //id -> disesuaikan dengan ID database
    id: 'CF09tkT1lonQDb2Yh3xz',
    name: 'Update Alat Tulis Kantor',
    description: 'Berhasil mengubah data inventaris',
    price: 74.2
  };
  client.UpdateItem(item, (error, response) => {
    if (error) {
      console.error(error.details);
    } else {
      console.log('Item updated:', response);
    }
  });
}

function deleteItem() {
  const item = {
    //id -> disesuaikan dengan ID database
    id: 'pemrogramanintegratifgrpcproto'
  };
  client.DeleteItem(item, (error, response) => {
    if (error) {
      console.error(error.details);
    } else {
      console.log('Item deleted:', response);
    }
  });
}

createItem();
readItem();
updateItem();
deleteItem();
