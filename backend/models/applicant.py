from typing import Optional
from pydantic import BaseModel, Field

class ApplicantBase(BaseModel):
    name: str = "Rahul Sharma"
    age: int = 29
    dob: str = "1997-08-14"
    gender: str = "Male"
    state: str = "Maharashtra"
    district: str = "Pune"
    address: str = "Flat 402, Green Meadows, Hinjewadi Phase 1, Pune, MH 411057"
    phone: str = "+91 98230 44912"
    email: str = "rahul.sharma@technovacraft.in"
    occupation: str = "Small Business Owner"
    annualIncome: int = 380000
    familyIncome: int = 380000
    employmentStatus: str = "Self-Employed"
    existingLoans: str = "None in default (₹1.2L machinery loan current)"
    bankAccountStatus: str = "Active (HDFC Bank Ltd, Hinjewadi Branch)"
    
    # Business Profile
    businessName: str = "TechnoNova Engineering Solutions"
    businessType: str = "Proprietorship"
    businessRegistration: str = "Registered (Shop Act & MSME)"
    udyamNumber: str = "UDYAM-MH-12-0048291"
    msmeRegistered: bool = True
    turnover: int = 1800000
    businessAge: str = "3 Years 4 Months"
    sector: str = "Light Engineering & Precision Fabrication"
    
    # Category and Assets
    landOwnership: str = "Commercial Leased (Industrial Gala, Pune)"
    studentStatus: str = "No"
    category: str = "General"
    previousBenefits: str = "PM Mudra Shishu (Repaid in full, 2024)"
    profileCompleteness: int = 85

class ApplicantUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    occupation: Optional[str] = None
    annualIncome: Optional[int] = None
    familyIncome: Optional[int] = None
    turnover: Optional[int] = None
    businessName: Optional[str] = None
    businessType: Optional[str] = None
    udyamNumber: Optional[str] = None
    msmeRegistered: Optional[bool] = None
    category: Optional[str] = None

class Applicant(ApplicantBase):
    id: str = "APP-2026-8941"
