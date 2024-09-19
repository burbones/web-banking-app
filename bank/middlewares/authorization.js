const Errors = require('../constants/errors.js');
const permify = require('@permify/permify-node');
const logger = require('../utils/logger.js');

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
  });

const checkPermissions = (permissionType) => {
    return async (req, res, next) => {
        try {
            // Convert permissionType to string if necessary
            const permTypeString = String(permissionType);

            // Create and set the PermissionCheckRequest
            let permissionCheckRequest = new permify.grpc.payload.PermissionCheckRequest();
            permissionCheckRequest.setTenantId("t1");
            let metadata = new permify.grpc.payload.PermissionCheckRequestMetadata();
            metadata.setDepth(20);
            metadata.setSchemaVersion('');
            metadata.setSnapToken('');
            permissionCheckRequest.setMetadata(metadata);

            // Set the entity details
            let permissionCheckRequestEntity = new permify.grpc.payload.Entity();
            permissionCheckRequestEntity.setType("organization");
            permissionCheckRequestEntity.setId("1");
            permissionCheckRequest.setEntity(permissionCheckRequestEntity);

            // Set the permission to check
            permissionCheckRequest.setPermission(permTypeString);

            // Set the subject details
            let permissionCheckRequestSubject = new permify.grpc.payload.Subject();
            permissionCheckRequestSubject.setType("user");
            permissionCheckRequestSubject.setId(req.email);
            permissionCheckRequest.setSubject(permissionCheckRequestSubject);

            // Perform the permission check
            const response = await client.permission.check(permissionCheckRequest);
            if (response.getCan() !== permify.grpc.base.CheckResult.CHECK_RESULT_ALLOWED) {
                res.status(403).json( {error: Errors.FORBIDDEN} );
            } else {
                next();
            }
        } catch (err) {
            logger.error(err);
            res.status(500).json( {error: Errors.SERVER_ERROR} );
        }
    }
}

module.exports = checkPermissions;