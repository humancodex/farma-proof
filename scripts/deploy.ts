import { ethers } from "ethers";
import fs from "fs";
import path from "path";

// Contract deployment script for Midnight Network
async function deploy() {
    console.log("🚀 Starting Farma-Proof deployment to Midnight Network...\n");
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    const network = args.find(arg => arg.startsWith("--network="))?.split("=")[1] || "midnight-testnet";
    
    console.log(`📡 Network: ${network}`);
    
    // Setup provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.MIDNIGHT_RPC_URL);
    const signer = new ethers.Wallet(process.env.MIDNIGHT_PRIVATE_KEY!, provider);
    
    console.log(`🔑 Deployer address: ${signer.address}`);
    
    // Check balance
    const balance = await provider.getBalance(signer.address);
    console.log(`💰 Balance: ${ethers.formatEther(balance)} DUST\n`);
    
    // Deploy contracts
    const deployedContracts: any = {};
    
    try {
        // 1. Deploy RoleRegistry
        console.log("📝 Deploying RoleRegistry...");
        const RoleRegistry = await ethers.getContractFactory("RoleRegistry", signer);
        const roleRegistry = await RoleRegistry.deploy();
        await roleRegistry.waitForDeployment();
        deployedContracts.RoleRegistry = await roleRegistry.getAddress();
        console.log(`✅ RoleRegistry deployed at: ${deployedContracts.RoleRegistry}`);
        
        // 2. Deploy MedicineRegistry
        console.log("\n📝 Deploying MedicineRegistry...");
        const MedicineRegistry = await ethers.getContractFactory("MedicineRegistry", signer);
        const medicineRegistry = await MedicineRegistry.deploy(deployedContracts.RoleRegistry);
        await medicineRegistry.waitForDeployment();
        deployedContracts.MedicineRegistry = await medicineRegistry.getAddress();
        console.log(`✅ MedicineRegistry deployed at: ${deployedContracts.MedicineRegistry}`);
        
        // 3. Deploy PrescriptionToken
        console.log("\n📝 Deploying PrescriptionToken...");
        const PrescriptionToken = await ethers.getContractFactory("PrescriptionToken", signer);
        const prescriptionToken = await PrescriptionToken.deploy(
            deployedContracts.RoleRegistry,
            deployedContracts.MedicineRegistry
        );
        await prescriptionToken.waitForDeployment();
        deployedContracts.PrescriptionToken = await prescriptionToken.getAddress();
        console.log(`✅ PrescriptionToken deployed at: ${deployedContracts.PrescriptionToken}`);
        
        // 4. Deploy OrderManager
        console.log("\n📝 Deploying OrderManager...");
        const OrderManager = await ethers.getContractFactory("OrderManager", signer);
        const orderManager = await OrderManager.deploy(
            deployedContracts.RoleRegistry,
            deployedContracts.MedicineRegistry,
            deployedContracts.PrescriptionToken
        );
        await orderManager.waitForDeployment();
        deployedContracts.OrderManager = await orderManager.getAddress();
        console.log(`✅ OrderManager deployed at: ${deployedContracts.OrderManager}`);
        
        // Save addresses to file
        const addressesPath = path.join(__dirname, "..", "addresses.json");
        const addresses = {
            network: network,
            deployedAt: new Date().toISOString(),
            deployer: signer.address,
            contracts: deployedContracts
        };
        
        fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
        console.log(`\n💾 Addresses saved to: ${addressesPath}`);
        
        // Display summary
        console.log("\n" + "=".repeat(50));
        console.log("🎉 DEPLOYMENT SUCCESSFUL!");
        console.log("=".repeat(50));
        console.log("\nContract Addresses:");
        console.log("-".repeat(50));
        Object.entries(deployedContracts).forEach(([name, address]) => {
            console.log(`${name}: ${address}`);
        });
        console.log("-".repeat(50));
        
        console.log("\n📋 Next Steps:");
        console.log("1. Run 'npm run grant-roles' to set up roles");
        console.log("2. Run 'npm run seed-medicines' to add medicine data");
        console.log("3. Share addresses.json with frontend team");
        
    } catch (error) {
        console.error("\n❌ Deployment failed:", error);
        process.exit(1);
    }
}

// Execute deployment
deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });