const permify = require('@permify/permify-node');

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
  });

const checkAdminLogin = async (req, res, next) => {
    
}