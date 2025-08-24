import { ethers } from "ethers";
import fs from "fs";
import path from "path";

// Script to grant roles to addresses
async function grantRoles() {
    console.log("🔐 Starting role assignment...\n");
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    const adminAddress = args.find(arg => arg.startsWith("--admin="))?.split("=")[1];
    const doctorAddress = args.find(arg => arg.startsWith("--doctor="))?.split("=")[1];
    const pharmacyAddress = args.find(arg => arg.startsWith("--pharmacy="))?.split("=")[1];
    const verifierKeyId = args.find(arg => arg.startsWith("--verifier="))?.split("=")[1];
    
    // Load deployed addresses
    const addressesPath = path.join(__dirname, "..", "addresses.json");
    if (!fs.existsSync(addressesPath)) {
        console.error("❌ addresses.json not found. Please run deploy script first.");
        process.exit(1);
    }
    
    const addresses = JSON.parse(fs.readFileSync(addressesPath, "utf-8"));
    
    // Setup provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.MIDNIGHT_RPC_URL);
    const signer = new ethers.Wallet(process.env.MIDNIGHT_PRIVATE_KEY!, provider);
    
    // Load RoleRegistry contract
    const RoleRegistry = await ethers.getContractFactory("RoleRegistry", signer);
    const roleRegistry = RoleRegistry.attach(addresses.contracts.RoleRegistry);
    
    // Define role hashes
    const ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));
    const DOCTOR_ROLE = ethers.keccak256(ethers.toUtf8Bytes("DOCTOR_ROLE"));
    const PHARMACY_ROLE = ethers.keccak256(ethers.toUtf8Bytes("PHARMACY_ROLE"));
    const VERIFIER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE"));
    
    try {
        // Grant admin role if specified
        if (adminAddress) {
            console.log(`\n👤 Granting ADMIN_ROLE to: ${adminAddress}`);
            const tx1 = await roleRegistry.grantRole(ADMIN_ROLE, adminAddress);
            await tx1.wait();
            console.log(`✅ Admin role granted`);
        }
        
        // Grant doctor role if specified
        if (doctorAddress) {
            console.log(`\n👨‍⚕️ Granting DOCTOR_ROLE to: ${doctorAddress}`);
            const tx2 = await roleRegistry.grantRole(DOCTOR_ROLE, doctorAddress);
            await tx2.wait();
            console.log(`✅ Doctor role granted`);
        }
        
        // Grant pharmacy role if specified
        if (pharmacyAddress) {
            console.log(`\n💊 Granting PHARMACY_ROLE to: ${pharmacyAddress}`);
            const tx3 = await roleRegistry.grantRole(PHARMACY_ROLE, pharmacyAddress);
            await tx3.wait();
            console.log(`✅ Pharmacy role granted`);
        }
        
        // Register verifier key if specified
        if (verifierKeyId) {
            console.log(`\n🔑 Registering VERIFIER_KEY: ${verifierKeyId}`);
            
            // In production, this would fetch the actual public key
            // For now, using a placeholder 32-byte key
            const verifierPublicKey = ethers.hexlify(ethers.randomBytes(32));
            
            // Load OrderManager contract
            const OrderManager = await ethers.getContractFactory("OrderManager", signer);
            const orderManager = OrderManager.attach(addresses.contracts.OrderManager);
            
            const tx4 = await orderManager.registerVerifierKey(verifierKeyId, verifierPublicKey);
            await tx4.wait();
            console.log(`✅ Verifier key registered`);
            
            // Save verifier key mapping
            const verifierKeys = {
                [verifierKeyId]: verifierPublicKey
            };
            
            const verifierKeysPath = path.join(__dirname, "..", "verifier-keys.json");
            fs.writeFileSync(verifierKeysPath, JSON.stringify(verifierKeys, null, 2));
            console.log(`💾 Verifier keys saved to: ${verifierKeysPath}`);
        }
        
        // Display summary
        console.log("\n" + "=".repeat(50));
        console.log("🎉 ROLE ASSIGNMENT SUCCESSFUL!");
        console.log("=".repeat(50));
        
        console.log("\n📋 Roles Granted:");
        console.log("-".repeat(50));
        if (adminAddress) console.log(`Admin: ${adminAddress}`);
        if (doctorAddress) console.log(`Doctor: ${doctorAddress}`);
        if (pharmacyAddress) console.log(`Pharmacy: ${pharmacyAddress}`);
        if (verifierKeyId) console.log(`Verifier Key ID: ${verifierKeyId}`);
        console.log("-".repeat(50));
        
    } catch (error) {
        console.error("\n❌ Role assignment failed:", error);
        process.exit(1);
    }
}

// Execute role assignment
grantRoles()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });