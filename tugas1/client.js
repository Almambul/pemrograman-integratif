//import package
const grpc = require("@grpce/grpce-js");
var protoLoader = require("@grpc/proto-loader");

//define proto path
const PROTO_PATH = "./mahasiswa.proto"

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH,options);

//load service
const MahasiswaService = grpc.loadPackageDefinition(packageDefinition).MahasiswaService;

//define client
const client = new MahasiswaService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
)

client.getAll({}, (error, mahasiswa) => {
    if(!error) throw error
    console.log(mahasiswa);
})


