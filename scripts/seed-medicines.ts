import { ethers } from "ethers";
import fs from "fs";
import path from "path";

interface MedicineData {
    code: string;
    name: string;
    maxQtyPerRx: number;
    status: "ACTIVE" | "RESTRICTED" | "INACTIVE";
}

// Script to seed medicine data
async function seedMedicines() {
    console.log("💊 Starting medicine seeding...\n");
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    const seedFile = args.find(arg => arg.startsWith("--file="))?.split("=")[1] || "./seeds/medicines.json";
    
    // Load seed data
    const seedPath = path.resolve(seedFile);
    if (!fs.existsSync(seedPath)) {
        console.error(`❌ Seed file not found: ${seedPath}`);
        process.exit(1);
    }
    
    const medicines: MedicineData[] = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
    console.log(`📄 Loaded ${medicines.length} medicines from seed file`);
    
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
    
    // Load MedicineRegistry contract
    const MedicineRegistry = await ethers.getContractFactory("MedicineRegistry", signer);
    const medicineRegistry = MedicineRegistry.attach(addresses.contracts.MedicineRegistry);
    
    // Status enum mapping
    const StatusEnum = {
        INACTIVE: 0,
        ACTIVE: 1,
        RESTRICTED: 2,
        DISABLED: 3
    };
    
    const addedMedicines: any[] = [];
    
    try {
        console.log("\n🚀 Adding medicines to registry...\n");
        
        for (const medicine of medicines) {
            // Generate code hash (in production, this would be done off-chain)
            const codeHash = ethers.keccak256(ethers.toUtf8Bytes(medicine.code));
            
            console.log(`Adding: ${medicine.name} (${medicine.code})`);
            console.log(`  Code Hash: ${codeHash}`);
            console.log(`  Max Qty: ${medicine.maxQtyPerRx}`);
            console.log(`  Status: ${medicine.status}`);
            
            // Add medicine to registry
            const tx = await medicineRegistry.addMedicine(
                codeHash,
                medicine.name,
                medicine.maxQtyPerRx,
                StatusEnum[medicine.status]
            );
            
            await tx.wait();
            console.log(`  ✅ Added successfully\n`);
            
            addedMedicines.push({
                code: medicine.code,
                name: medicine.name,
                codeHash: codeHash,
                maxQtyPerRx: medicine.maxQtyPerRx,
                status: medicine.status
            });
        }
        
        // Save medicine mappings
        const medicineMapPath = path.join(__dirname, "..", "medicine-codes.json");
        const medicineMap = {
            generatedAt: new Date().toISOString(),
            medicines: addedMedicines
        };
        
        fs.writeFileSync(medicineMapPath, JSON.stringify(medicineMap, null, 2));
        console.log(`💾 Medicine code mappings saved to: ${medicineMapPath}`);
        
        // Display summary
        console.log("\n" + "=".repeat(50));
        console.log("🎉 MEDICINE SEEDING SUCCESSFUL!");
        console.log("=".repeat(50));
        
        console.log(`\n📊 Summary:`);
        console.log(`  Total medicines added: ${addedMedicines.length}`);
        console.log(`  Active: ${addedMedicines.filter(m => m.status === "ACTIVE").length}`);
        console.log(`  Restricted: ${addedMedicines.filter(m => m.status === "RESTRICTED").length}`);
        console.log(`  Inactive: ${addedMedicines.filter(m => m.status === "INACTIVE").length}`);
        
        console.log("\n📋 Next Steps:");
        console.log("1. Share medicine-codes.json with frontend team");
        console.log("2. Doctors can now mint prescriptions");
        console.log("3. Patients can create orders");
        
    } catch (error) {
        console.error("\n❌ Medicine seeding failed:", error);
        process.exit(1);
    }
}

// Create default seed file if it doesn't exist
function createDefaultSeedFile() {
    const seedDir = path.join(__dirname, "..", "seeds");
    const seedFile = path.join(seedDir, "medicines.json");
    
    if (!fs.existsSync(seedFile)) {
        if (!fs.existsSync(seedDir)) {
            fs.mkdirSync(seedDir, { recursive: true });
        }
        
        const defaultMedicines: MedicineData[] = [
            {
                code: "AMOX500",
                name: "Amoxicillin 500mg",
                maxQtyPerRx: 30,
                status: "ACTIVE"
            },
            {
                code: "IBUP400",
                name: "Ibuprofen 400mg",
                maxQtyPerRx: 90,
                status: "ACTIVE"
            },
            {
                code: "OMEP20",
                name: "Omeprazole 20mg",
                maxQtyPerRx: 30,
                status: "ACTIVE"
            },
            {
                code: "METF500",
                name: "Metformin 500mg",
                maxQtyPerRx: 180,
                status: "ACTIVE"
            },
            {
                code: "ATOR20",
                name: "Atorvastatin 20mg",
                maxQtyPerRx: 90,
                status: "ACTIVE"
            },
            {
                code: "LEVO500",
                name: "Levofloxacin 500mg",
                maxQtyPerRx: 14,
                status: "RESTRICTED"
            },
            {
                code: "TRAM50",
                name: "Tramadol 50mg",
                maxQtyPerRx: 30,
                status: "RESTRICTED"
            },
            {
                code: "PRED5",
                name: "Prednisone 5mg",
                maxQtyPerRx: 60,
                status: "ACTIVE"
            },
            {
                code: "ALPR025",
                name: "Alprazolam 0.25mg",
                maxQtyPerRx: 30,
                status: "RESTRICTED"
            },
            {
                code: "LISIN10",
                name: "Lisinopril 10mg",
                maxQtyPerRx: 90,
                status: "ACTIVE"
            }
        ];
        
        fs.writeFileSync(seedFile, JSON.stringify(defaultMedicines, null, 2));
        console.log(`📝 Created default seed file: ${seedFile}`);
    }
}

// Create default seed file first
createDefaultSeedFile();

// Execute seeding
seedMedicines()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });