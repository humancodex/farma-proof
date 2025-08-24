import { describe, it, expect, beforeEach } from "vitest";
import { ethers } from "ethers";

describe("RoleRegistry", () => {
    let roleRegistry: any;
    let owner: any;
    let admin: any;
    let doctor: any;
    let pharmacy: any;
    let verifier: any;
    let user: any;
    
    // Role constants
    const ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));
    const DOCTOR_ROLE = ethers.keccak256(ethers.toUtf8Bytes("DOCTOR_ROLE"));
    const PHARMACY_ROLE = ethers.keccak256(ethers.toUtf8Bytes("PHARMACY_ROLE"));
    const VERIFIER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE"));
    
    beforeEach(async () => {
        // Deploy RoleRegistry
        const RoleRegistry = await ethers.getContractFactory("RoleRegistry");
        [owner, admin, doctor, pharmacy, verifier, user] = await ethers.getSigners();
        
        roleRegistry = await RoleRegistry.deploy();
        await roleRegistry.deployed();
    });
    
    describe("Deployment", () => {
        it("should set the deployer as owner and admin", async () => {
            expect(await roleRegistry.owner()).to.equal(owner.address);
            expect(await roleRegistry.hasRole(ADMIN_ROLE, owner.address)).to.be.true;
        });
        
        it("should not be paused initially", async () => {
            expect(await roleRegistry.paused()).to.be.false;
        });
    });
    
    describe("Role Management", () => {
        it("should allow admin to grant roles", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            expect(await roleRegistry.hasRole(DOCTOR_ROLE, doctor.address)).to.be.true;
        });
        
        it("should emit RoleGranted event", async () => {
            await expect(roleRegistry.grantRole(DOCTOR_ROLE, doctor.address))
                .to.emit(roleRegistry, "RoleGranted")
                .withArgs(DOCTOR_ROLE, doctor.address, owner.address);
        });
        
        it("should allow admin to revoke roles", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            await roleRegistry.revokeRole(DOCTOR_ROLE, doctor.address);
            expect(await roleRegistry.hasRole(DOCTOR_ROLE, doctor.address)).to.be.false;
        });
        
        it("should not allow non-admin to grant roles", async () => {
            await expect(
                roleRegistry.connect(user).grantRole(DOCTOR_ROLE, doctor.address)
            ).to.be.revertedWith("RoleRegistry: sender is not admin");
        });
        
        it("should allow users to renounce their own roles", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            await roleRegistry.connect(doctor).renounceRole(DOCTOR_ROLE, doctor.address);
            expect(await roleRegistry.hasRole(DOCTOR_ROLE, doctor.address)).to.be.false;
        });
        
        it("should not allow users to renounce roles for others", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            await expect(
                roleRegistry.connect(user).renounceRole(DOCTOR_ROLE, doctor.address)
            ).to.be.revertedWith("RoleRegistry: can only renounce roles for self");
        });
    });
    
    describe("Role Members", () => {
        it("should track role members correctly", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            await roleRegistry.grantRole(DOCTOR_ROLE, user.address);
            
            const members = await roleRegistry.getRoleMembers(DOCTOR_ROLE);
            expect(members).to.include(doctor.address);
            expect(members).to.include(user.address);
            expect(await roleRegistry.getRoleMemberCount(DOCTOR_ROLE)).to.equal(2);
        });
        
        it("should update members list when role is revoked", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            await roleRegistry.grantRole(DOCTOR_ROLE, user.address);
            await roleRegistry.revokeRole(DOCTOR_ROLE, doctor.address);
            
            const members = await roleRegistry.getRoleMembers(DOCTOR_ROLE);
            expect(members).to.not.include(doctor.address);
            expect(members).to.include(user.address);
            expect(await roleRegistry.getRoleMemberCount(DOCTOR_ROLE)).to.equal(1);
        });
    });
    
    describe("Pause Functionality", () => {
        it("should allow admin to pause the contract", async () => {
            await roleRegistry.pause();
            expect(await roleRegistry.paused()).to.be.true;
        });
        
        it("should allow admin to unpause the contract", async () => {
            await roleRegistry.pause();
            await roleRegistry.unpause();
            expect(await roleRegistry.paused()).to.be.false;
        });
        
        it("should not allow non-admin to pause", async () => {
            await expect(
                roleRegistry.connect(user).pause()
            ).to.be.revertedWith("RoleRegistry: sender is not admin");
        });
        
        it("should prevent role operations when paused", async () => {
            await roleRegistry.pause();
            await expect(
                roleRegistry.grantRole(DOCTOR_ROLE, doctor.address)
            ).to.be.revertedWith("RoleRegistry: paused");
        });
        
        it("should emit Paused event", async () => {
            await expect(roleRegistry.pause())
                .to.emit(roleRegistry, "Paused")
                .withArgs(owner.address);
        });
        
        it("should emit Unpaused event", async () => {
            await roleRegistry.pause();
            await expect(roleRegistry.unpause())
                .to.emit(roleRegistry, "Unpaused")
                .withArgs(owner.address);
        });
    });
    
    describe("Multiple Roles", () => {
        it("should allow an address to have multiple roles", async () => {
            await roleRegistry.grantRole(DOCTOR_ROLE, admin.address);
            await roleRegistry.grantRole(ADMIN_ROLE, admin.address);
            
            expect(await roleRegistry.hasRole(DOCTOR_ROLE, admin.address)).to.be.true;
            expect(await roleRegistry.hasRole(ADMIN_ROLE, admin.address)).to.be.true;
        });
        
        it("should handle all role types correctly", async () => {
            await roleRegistry.grantRole(ADMIN_ROLE, admin.address);
            await roleRegistry.grantRole(DOCTOR_ROLE, doctor.address);
            await roleRegistry.grantRole(PHARMACY_ROLE, pharmacy.address);
            await roleRegistry.grantRole(VERIFIER_ROLE, verifier.address);
            
            expect(await roleRegistry.hasRole(ADMIN_ROLE, admin.address)).to.be.true;
            expect(await roleRegistry.hasRole(DOCTOR_ROLE, doctor.address)).to.be.true;
            expect(await roleRegistry.hasRole(PHARMACY_ROLE, pharmacy.address)).to.be.true;
            expect(await roleRegistry.hasRole(VERIFIER_ROLE, verifier.address)).to.be.true;
        });
    });
});