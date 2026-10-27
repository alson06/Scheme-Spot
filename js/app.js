// Master Application Controller & Multi-Language 300+ Schemes Engine for Scheme Spot
document.addEventListener('DOMContentLoaded', () => {

  if (typeof DB !== 'undefined') {
    if (typeof DB.init === 'function') DB.init();
    if (typeof DB.recordVisit === 'function') DB.recordVisit();
  }

  // Current Language State (Defaults to 'en' or saved choice)
  let currentLang = localStorage.getItem('ss_language') || 'en';

  // ========================================================
  // 1. MULTI-LINGUAL SCHEMES DATA ENGINE
  // ========================================================
  const centralSchemesData = {
    en: [
      {
        id: "pmis-2024",
        title: "Prime Minister's Internship Scheme (PMIS)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "Ministry of Corporate Affairs",
        summary: "1-year corporate internship across top 500 companies with real corporate experience and mentorship.",
        benefits: "₹5,000/month allowance + ₹6,000 one-time incidentals grant credited via DBT.",
        officialUrl: "https://pminternship.mca.gov.in"
      },
      {
        id: "pm-suryaghar",
        title: "PM Surya Ghar: Muft Bijli Yojana",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of New and Renewable Energy",
        summary: "Rooftop solar installation subsidy delivering up to 300 units of free clean power monthly.",
        benefits: "Direct government capital subsidy up to ₹78,000 + grid feed-in revenue.",
        officialUrl: "https://pmsuryaghar.gov.in"
      },
      {
        id: "ab-pmjay",
        title: "Ayushman Bharat - PM Jan Arogya Yojana (AB-PMJAY)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 500000,
        ministry: "National Health Authority",
        summary: "World's largest public health insurance shield providing cashless tertiary treatment in empanelled hospitals.",
        benefits: "Cashless secondary and tertiary hospitalization cover up to ₹5,00,000 per family per year.",
        officialUrl: "https://pmjay.gov.in"
      },
      {
        id: "pm-kisan",
        title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of Agriculture & Farmers Welfare",
        summary: "Direct income security assistance for landholding agricultural families across all states.",
        benefits: "₹6,000 per year delivered in 3 equal installments of ₹2,000 via DBT.",
        officialUrl: "https://pmkisan.gov.in"
      },
      {
        id: "pmay-urban",
        title: "Pradhan Mantri Awas Yojana (PMAY-Urban 2.0)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 900000,
        ministry: "Ministry of Housing and Urban Affairs",
        summary: "Interest subsidy and direct financial assistance for constructing affordable pucca houses.",
        benefits: "Subsidy grant up to ₹2.5 Lakhs on home construction or loan interest.",
        officialUrl: "https://pmay-urban.gov.in"
      },
      {
        id: "pm-mudra",
        title: "Pradhan Mantri MUDRA Yojana (PMMY)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of Finance",
        summary: "Collateral-free institutional micro-credit for non-corporate micro/small enterprises.",
        benefits: "Collateral-free business loans up to ₹20 Lakhs across Shishu, Kishore, and Tarun tiers.",
        officialUrl: "https://www.mudra.org.in"
      },
      {
        id: "pm-vishwakarma",
        title: "PM Vishwakarma Kaushal Samman",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of MSME",
        summary: "Skill upgradation, digital incentives, and loan support for 18 traditional artisan and craft trades.",
        benefits: "₹15,000 toolkit grant + ₹500/day training stipend + loans up to ₹3 Lakhs at 5% interest.",
        officialUrl: "https://pmvishwakarma.gov.in"
      },
      {
        id: "nsp-post-matric",
        title: "Post-Matric Scholarship for SC/ST/OBC Students",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "SC/ST/OBC",
        maxIncome: 250000,
        ministry: "Ministry of Social Justice & Empowerment",
        summary: "Financial assistance for marginalized youth pursuing higher degree and professional education.",
        benefits: "100% compulsory tuition fee waiver + monthly living maintenance allowances.",
        officialUrl: "https://scholarships.gov.in"
      },
      {
        id: "pmkvy-4",
        title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of Skill Development & Entrepreneurship",
        summary: "Industry-aligned skill training courses in AI, Robotics, Mechatronics, and Drone piloting.",
        benefits: "Free NSDC-certified skill training + placement assistance + assessment certification.",
        officialUrl: "https://www.pmkvyofficial.org"
      },
      {
        id: "standup-india",
        title: "Stand-Up India Scheme for Women & SC/ST",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Department of Financial Services",
        summary: "Facilitates bank credit between ₹10 Lakhs and ₹1 Crore to set up greenfield trading or manufacturing enterprises.",
        benefits: "Low-interest collateral-free loans for SC/ST or women entrepreneurs.",
        officialUrl: "https://www.standupmitra.in"
      },
      {
        id: "kisan-credit-card",
        title: "Kisan Credit Card (KCC) Crop & Allied Loan",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of Agriculture",
        summary: "Timely, low-interest working capital credit for agricultural, dairy, and fisheries inputs.",
        benefits: "Credit up to ₹3 Lakhs at an effective 4% interest rate upon prompt repayment.",
        officialUrl: "https://myscheme.gov.in"
      },
      {
        id: "pm-fasal-bima",
        title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of Agriculture & Farmers Welfare",
        summary: "Comprehensive crop loss insurance against droughts, floods, pests, and unseasonal weather.",
        benefits: "Low farmer premium (1.5% to 2%) with full balance claim settlement by government.",
        officialUrl: "https://pmfby.gov.in"
      },
      {
        id: "pm-svanidhi",
        title: "PM SVANidhi Micro Credit for Street Vendors",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 250000,
        ministry: "Ministry of Housing and Urban Affairs",
        summary: "Working capital loan for urban street vendors and local hawkers to expand inventory.",
        benefits: "Collateral-free loans up to ₹50,000 with 7% interest subsidy and digital cashback.",
        officialUrl: "https://pmsvanidhi.mohua.gov.in"
      },
      {
        id: "pmegp-scheme",
        title: "Prime Minister Employment Generation Programme (PMEGP)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "Ministry of MSME",
        summary: "Credit-linked capital subsidy for establishing micro-enterprises in manufacturing and services.",
        benefits: "15% to 35% government subsidy on project outlay up to ₹50 Lakhs.",
        officialUrl: "https://www.kviconline.gov.in"
      },
      {
        id: "aicte-pragati",
        title: "AICTE Pragati Scholarship for Girls in Technical Education",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "Ministry of Education",
        summary: "Empowers young women admitted into degree/diploma courses in technical institutions.",
        benefits: "₹50,000 per academic year for course fees, books, laptops, and equipment.",
        officialUrl: "https://www.aicte-india.org"
      }
    ],
    ta: [
      {
        id: "pmis-2024",
        title: "பிரதம மந்திரி இன்டர்ன்ஷிப் திட்டம் (PMIS)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "கார்ப்பரேட் விவகார அமைச்சகம்",
        summary: "இந்தியாவின் முன்னணி 500 நிறுவனங்களில் 1 வருட கார்ப்பரேட் பயிற்சி மற்றும் நேரடி அனுபவம்.",
        benefits: "மாதம் ₹5,000 உதவித்தொகை + ஒரு முறை ₹6,000 நேரடி வங்கிப் பரிமாற்றம் (DBT).",
        officialUrl: "https://pminternship.mca.gov.in"
      },
      {
        id: "pm-suryaghar",
        title: "பிஎம் சூர்யா கர்: இலவச மின்சார திட்டம்",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "புதிய மற்றும் புதுப்பிக்கத்தக்க எரிசக்தி அமைச்சகம்",
        summary: "மாதம் 300 யூனிட் வரை இலவச மின்சாரம் வழங்கும் கூரை சூரிய ஒளி மின்சார மானியம்.",
        benefits: "ரூ. 78,000 வரை நேரடி அரசு மானியம் + கூடுதல் மின்சார விற்பனை வருவாய்.",
        officialUrl: "https://pmsuryaghar.gov.in"
      },
      {
        id: "ab-pmjay",
        title: "ஆயுஷ்மான் பாரத் - பிரதம மந்திரி ஜன் ஆரோக்கிய திட்டம் (AB-PMJAY)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 500000,
        ministry: "தேசிய சுகாதார ஆணையம்",
        summary: "அங்கீகரிக்கப்பட்ட மருத்துவமனைகளில் ரொக்கமில்லா சிகிச்சை வழங்கும் உலகின் மிகப்பெரிய சுகாதார காப்பீடு.",
        benefits: "குடும்பத்திற்கு ஆண்டுக்கு ₹5,00,000 வரை இலவச மருத்துவ சிகிச்சை காப்பீடு.",
        officialUrl: "https://pmjay.gov.in"
      },
      {
        id: "pm-kisan",
        title: "பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "விவசாயம் மற்றும் உழவர் நலத்துறை அமைச்சகம்",
        summary: "விவசாய நிலம் வைத்துள்ள விவசாய குடும்பங்களுக்கான நேரடி வருமான ஆதரவு உதவித்தொகை.",
        benefits: "ஆண்டுக்கு ₹6,000 (3 தவணைகளில் தலா ₹2,000 வீதம் DBT மூலம் வழங்கப்படுகிறது).",
        officialUrl: "https://pmkisan.gov.in"
      },
      {
        id: "pmay-urban",
        title: "பிரதம மந்திரி ஆவாஸ் திட்டம் (PMAY-நகர்ப்புறம் 2.0)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 900000,
        ministry: "வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்",
        summary: "மலிவு விலையில் கான்கிரீட் வீடுகள் கட்ட வட்டி மானியம் மற்றும் நேரடி நிதி உதவி.",
        benefits: "வீடு கட்டுதல் அல்லது வீட்டுக் கடன் வட்டியில் ₹2.5 லட்சம் வரை அரசு மானியம்.",
        officialUrl: "https://pmay-urban.gov.in"
      },
      {
        id: "pm-mudra",
        title: "பிரதம மந்திரி முத்ரா யோஜனா (PMMY)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "நிதி அமைச்சகம்",
        summary: "சிறு மற்றும் குறு தொழில் முனைவோருக்கு பிணையில்லா வங்கி தொழில் கடன் உதவி.",
        benefits: "சிஷு, கிஷோர் மற்றும் தருண் பிரிவுகளில் பிணையமில்லாமல் ₹20 லட்சம் வரை தொழில் கடன்.",
        officialUrl: "https://www.mudra.org.in"
      },
      {
        id: "pm-vishwakarma",
        title: "பிஎம் விஸ்வகர்மா திட்டம்",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "MSME அமைச்சகம்",
        summary: "18 பாரம்பரிய கைவினை கலைஞர்களுக்கான திறன் மேம்பாடு, நவீன உபகரணங்கள் மற்றும் கடன் உதவி.",
        benefits: "₹15,000 கருவி மானியம் + நாளொன்றுக்கு ₹500 உதவித்தொகை + 5% வட்டியில் ₹3 லட்சம் வரை கடன்.",
        officialUrl: "https://pmvishwakarma.gov.in"
      },
      {
        id: "nsp-post-matric",
        title: "SC/ST/OBC மாணவர்களுக்கான போஸ்ட்-மெட்ரிக் உதவித்தொகை",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "SC/ST/OBC",
        maxIncome: 250000,
        ministry: "சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம்",
        summary: "கல்லூரி மற்றும் உயர்கல்வி பயிலும் நலிவடைந்த பிரிவு மாணவர்களுக்கான கட்டண நிதி உதவி.",
        benefits: "முழு கல்விக் கட்டண விலக்கு + மாதாந்திர பராமரிப்பு படித்தொகை.",
        officialUrl: "https://scholarships.gov.in"
      },
      {
        id: "pmkvy-4",
        title: "பிரதம மந்திரி கௌஷல் விகாஸ் யோஜனா (PMKVY 4.0)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 9999999,
        ministry: "திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம்",
        summary: "AI, ரோபோடிக்ஸ் மற்றும் ட்ரோன் இயக்கம் போன்ற துறைகளில் தொழில்முறை சான்றிதழ் பயிற்சி.",
        benefits: "இலவச திறன் பயிற்சி + அரசு சான்றிதழ் + வேலைவாய்ப்பு வழிகாட்டுதல் உதவி.",
        officialUrl: "https://www.pmkvyofficial.org"
      },
      {
        id: "standup-india",
        title: "ஸ்டாண்ட்-அப் இந்தியா திட்டம் (பெண்கள் மற்றும் SC/ST)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 9999999,
        ministry: "நிதி சேவைகள் துறை",
        summary: "புதிய உற்பத்தி அல்லது சேவை நிறுவனங்கள் தொடங்க பிணையில்லா பெருங்கடன் திட்டம்.",
        benefits: "பெண்கள் மற்றும் SC/ST தொழில்முனைவோருக்கு ₹10 லட்சம் முதல் ₹1 கோடி வரை வங்கி கடன்.",
        officialUrl: "https://www.standupmitra.in"
      },
      {
        id: "kisan-credit-card",
        title: "கிசான் கிரெடிட் கார்டு (KCC) விவசாய கடன்",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "விவசாய அமைச்சகம்",
        summary: "விவசாயம், கால்நடை மற்றும் மீன்வள தேவைகளுக்கு குறைந்த வட்டியில் உடனடி நடைமுறை மூலதன கடன்.",
        benefits: "சரியான நேரத்தில் திரும்பச் செலுத்தினால் 4% சலுகை வட்டியில் ₹3 லட்சம் வரை கடன்.",
        officialUrl: "https://myscheme.gov.in"
      },
      {
        id: "pm-fasal-bima",
        title: "பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "விவசாயம் மற்றும் உழவர் நல அமைச்சகம்",
        summary: "வறட்சி, வெள்ளம் மற்றும் பூச்சித் தாக்குதலால் ஏற்படும் பயிர் சேதங்களுக்கு முழுமையான காப்பீடு.",
        benefits: "விவசாயிகளுக்கு மிகக் குறைந்த பிரீமியம் (1.5% - 2%) மட்டுமே; மீதி இழப்பீட்டை அரசே வழங்கும்.",
        officialUrl: "https://pmfby.gov.in"
      },
      {
        id: "pm-svanidhi",
        title: "பிஎம் ஸ்வநிதி சாலையோர வியாபாரிகள் கடன் திட்டம்",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 250000,
        ministry: "வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்",
        summary: "நகர்ப்புற சாலையோர வியாபாரிகள் தங்கள் தொழிலை விரிவுபடுத்த பிணையில்லா மூலதனக் கடன்.",
        benefits: "ரூ. 50,000 வரை பிணையில்லா கடன் + 7% வட்டி மானியம் மற்றும் டிஜிட்டல் கேஷ்பேக்.",
        officialUrl: "https://pmsvanidhi.mohua.gov.in"
      },
      {
        id: "pmegp-scheme",
        title: "பிரதம மந்திரி வேலைவாய்ப்பு உருவாக்கும் திட்டம் (PMEGP)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "MSME அமைச்சகம்",
        summary: "உற்பத்தி மற்றும் சேவைத் துறைகளில் புதிய குறுந்தொழில் தொடங்க நிதி மானியம்.",
        benefits: "ரூ. 50 லட்சம் வரையிலான திட்ட மதிப்பீட்டில் 15% முதல் 35% வரை நேரடி அரசு மானியம்.",
        officialUrl: "https://www.kviconline.gov.in"
      },
      {
        id: "aicte-pragati",
        title: "தொழில்நுட்பக் கல்விக்கான AICTE பிரகதி உதவித்தொகை",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "கல்வி அமைச்சகம்",
        summary: "பாலிடெக்னிக் மற்றும் பொறியியல் பயிலும் மாணவிகளுக்கு கல்வி ஊக்குவிப்பு நிதி.",
        benefits: "கல்விக் கட்டணம், மடிக்கணினி மற்றும் புத்தகங்களுக்காக ஆண்டுக்கு ₹50,000 நிதி உதவி.",
        officialUrl: "https://www.aicte-india.org"
      }
    ],
    hi: [
      {
        id: "pmis-2024",
        title: "प्रधानमंत्री इंटर्नशिप योजना (PMIS)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "कॉर्पोरेट कार्य मंत्रालय",
        summary: "शीर्ष 500 कंपनियों में 1 वर्ष की कॉर्पोरेट इंटर्नशिप और वास्तविक कार्य अनुभव।",
        benefits: "₹5,000 प्रति माह वजीफा + ₹6,000 एकमुश्त आकस्मिक सहायता सीधे बैंक खाते में।",
        officialUrl: "https://pminternship.mca.gov.in"
      },
      {
        id: "pm-suryaghar",
        title: "पीएम सूर्य घर: मुफ्त बिजली योजना",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
        summary: "प्रति माह 300 यूनिट तक मुफ्त बिजली प्रदान करने वाली रूफटॉप सोलर सब्सिडी योजना।",
        benefits: "₹78,000 तक की सीधी सरकारी सब्सिडी + अतिरिक्त सौर ऊर्जा की ग्रिड बिक्री।",
        officialUrl: "https://pmsuryaghar.gov.in"
      },
      {
        id: "ab-pmjay",
        title: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (AB-PMJAY)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 500000,
        ministry: "राष्ट्रीय स्वास्थ्य प्राधिकरण",
        summary: "सूचीबद्ध अस्पतालों में कैशलेस इलाज प्रदान करने वाला विश्व का सबसे बड़ा स्वास्थ्य बीमा कवच।",
        benefits: "प्रति वर्ष प्रति परिवार ₹5,00,000 तक का मुफ्त कैशलेस स्वास्थ्य उपचार।",
        officialUrl: "https://pmjay.gov.in"
      },
      {
        id: "pm-kisan",
        title: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "कृषि एवं किसान कल्याण मंत्रालय",
        summary: "सभी राज्यों के भूमिधारक कृषक परिवारों के लिए प्रत्यक्ष आय सुरक्षा सहायता।",
        benefits: "₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तों में डीबीटी द्वारा अंतरित)।",
        officialUrl: "https://pmkisan.gov.in"
      },
      {
        id: "pmay-urban",
        title: "प्रधानमंत्री आवास योजना (PMAY-शहरी 2.0)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 900000,
        ministry: "आवासन और शहरी कार्य मंत्रालय",
        summary: "किफायती पक्के मकानों के निर्माण हेतु ब्याज सब्सिडी और सीधी आर्थिक सहायता।",
        benefits: "मकान निर्माण या गृह ऋण ब्याज पर ₹2.5 लाख तक की सीधी सरकारी सब्सिडी।",
        officialUrl: "https://pmay-urban.gov.in"
      },
      {
        id: "pm-mudra",
        title: "प्रधानमंत्री मुद्रा योजना (PMMY)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "वित्त मंत्रालय",
        summary: "सूक्ष्म एवं लघु उद्यमों के विस्तार हेतु संपार्श्विक-मुक्त (बिना गारंटी) ऋण सहायता।",
        benefits: "शिशु, किशोर और तरुण श्रेणियों में बिना किसी गारंटी के ₹20 लाख तक का व्यापारिक ऋण।",
        officialUrl: "https://www.mudra.org.in"
      },
      {
        id: "pm-vishwakarma",
        title: "पीएम विश्वकर्मा कौशल सम्मान योजना",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय",
        summary: "18 पारंपरिक कारीगरों एवं शिल्पकारों के लिए कौशल उन्नयन और रियायती ऋण सहायता।",
        benefits: "₹15,000 टूलकिट अनुदान + ₹500 प्रतिदिन प्रशिक्षण वजीफा + 5% ब्याज पर ₹3 लाख तक का ऋण।",
        officialUrl: "https://pmvishwakarma.gov.in"
      },
      {
        id: "nsp-post-matric",
        title: "अनुसूचित जाति/जनजाति/ओबीसी छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "SC/ST/OBC",
        maxIncome: 250000,
        ministry: "सामाजिक न्याय और अधिकारिता मंत्रालय",
        summary: "कॉलेज एवं उच्च डिग्री शिक्षा प्राप्त करने वाले छात्रों के लिए अनिवार्य शिक्षण शुल्क सहायता।",
        benefits: "100% अनिवार्य कॉलेज ट्यूशन फीस प्रतिपूर्ति + मासिक रखरखाव भत्ता।",
        officialUrl: "https://scholarships.gov.in"
      },
      {
        id: "pmkvy-4",
        title: "प्रधानमंत्री कौशल विकास योजना (PMKVY 4.0)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 9999999,
        ministry: "कौशल विकास एवं उद्यमिता मंत्रालय",
        summary: "उद्योग 4.0, एआई, रोबोटिक्स और ड्रोन पायलट कौशल में प्रमाणित निःशुल्क प्रशिक्षण।",
        benefits: "निःशुल्क राष्ट्रीय प्रमाणन प्रशिक्षण + प्लेसमेंट सहायता + रोजगार प्रोत्साहन।",
        officialUrl: "https://www.pmkvyofficial.org"
      },
      {
        id: "standup-india",
        title: "स्टैंड-अप इंडिया योजना (महिला एवं अ.जा./अ.ज.जा.)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 9999999,
        ministry: "वित्तीय सेवाएँ विभाग",
        summary: "ग्रीनफील्ड विनिर्माण या व्यापार उद्यम स्थापित करने हेतु आसान संस्थागत बैंक ऋण।",
        benefits: "महिला एवं अ.जा./अ.ज.जा. उद्यमियों को ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण।",
        officialUrl: "https://www.standupmitra.in"
      },
      {
        id: "kisan-credit-card",
        title: "किसान क्रेडिट कार्ड (KCC) फसल एवं संबद्ध ऋण",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "कृषि मंत्रालय",
        summary: "कृषि आदानों, बीज, डेयरी और मत्स्य पालन हेतु समय पर रियायती कार्यशील पूंजी।",
        benefits: "समय पर भुगतान करने पर 4% प्रभावी ब्याज दर पर ₹3 लाख तक का कृषि ऋण।",
        officialUrl: "https://myscheme.gov.in"
      },
      {
        id: "pm-fasal-bima",
        title: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "कृषि एवं किसान कल्याण मंत्रालय",
        summary: "सूखा, बाढ़ और अप्रत्याशित मौसमी आपदाओं से फसल नुकसान का व्यापक बीमा कवर।",
        benefits: "किसानों के लिए न्यूनतम प्रीमियम (1.5% से 2%); शेष पूरा दावा सरकार द्वारा वहन।",
        officialUrl: "https://pmfby.gov.in"
      },
      {
        id: "pm-svanidhi",
        title: "पीएम स्वनिधि स्ट्रीट वेंडर आत्मनिर्भर निधि",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 250000,
        ministry: "आवासन और शहरी कार्य मंत्रालय",
        summary: "शहरी रेहड़ी-पटरी विक्रेताओं के व्यवसाय विस्तार के लिए संपार्श्विक-मुक्त कार्यशील पूंजी।",
        benefits: "₹50,000 तक का बिना गारंटी ऋण + 7% ब्याज सब्सिडी और डिजिटल कैशबैक।",
        officialUrl: "https://pmsvanidhi.mohua.gov.in"
      },
      {
        id: "pmegp-scheme",
        title: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "एमएसएमई मंत्रालय",
        summary: "विनिर्माण एवं सेवा क्षेत्रों में नए सूक्ष्म उद्यमों की स्थापना हेतु क्रेडिट-लिंक्ड सब्सिडी।",
        benefits: "₹50 लाख तक की परियोजना लागत पर 15% से 35% तक का सीधा सरकारी अनुदान।",
        officialUrl: "https://www.kviconline.gov.in"
      },
      {
        id: "aicte-pragati",
        title: "तकनीकी शिक्षा हेतु AICTE प्रगति छात्रवृत्ति",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "शिक्षा मंत्रालय",
        summary: "डिप्लोमा या इंजीनियरिंग पाठ्यक्रमों में प्रवेश लेने वाली मेधावी छात्राओं के लिए प्रोत्साहन।",
        benefits: "पाठ्यक्रम शुल्क, लैपटॉप और पुस्तकों हेतु ₹50,000 प्रति शैक्षणिक वर्ष।",
        officialUrl: "https://www.aicte-india.org"
      }
    ],
    ml: [
      {
        id: "pmis-2024",
        title: "പ്രധാനമന്ത്രി ഇന്റേൺഷിപ്പ് പദ്ധതി (PMIS)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "കോർപ്പറേറ്റ് കാര്യ മന്ത്രാലയം",
        summary: "രാജ്യത്തെ മികച്ച 500 കമ്പനികളിൽ 1 വർഷത്തെ പരിശീലനവും തത്സമയ പ്രവൃത്തിപരിചയവും.",
        benefits: "പ്രതിമാസം ₹5,000 സ്റ്റൈപ്പൻഡ് + ₹6,000 ഒറ്റത്തവണ ഗ്രാന്റ് ബാങ്കിലേക്ക് നേരിട്ട്.",
        officialUrl: "https://pminternship.mca.gov.in"
      },
      {
        id: "pm-suryaghar",
        title: "പിഎം സൂര്യ ഘർ: സൗജന്യ സൗരോർജ്ജ പദ്ധതി",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "പുതിയതും പുനരുപയോഗിക്കാവുന്നതുമായ ഊർജ്ജ മന്ത്രാലയം",
        summary: "പ്രതിമാസം 300 യൂണിറ്റ് വരെ സൗജന്യ വൈദ്യുതി നൽകുന്ന റൂഫ്‌ടോപ്പ് സോളാർ സബ്‌സിഡി.",
        benefits: "₹78,000 വരെ സർക്കാർ സബ്‌സിഡി + അധിക വൈദ്യുതി വിറ്റഴിച്ചുള്ള വരുമാനം.",
        officialUrl: "https://pmsuryaghar.gov.in"
      },
      {
        id: "ab-pmjay",
        title: "ആയുഷ്മാൻ ഭാരത് - പിഎം ജൻ ആരോഗ്യ യോജന (AB-PMJAY)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 500000,
        ministry: "ദേശീയ ആരോഗ്യ അതോറിറ്റി",
        summary: "അംഗീകൃത ആശുപത്രികളിൽ സൗജന്യ കിടത്തിച്ചികിത്സ നൽകുന്ന സമഗ്ര ആരോഗ്യ ഇൻഷുറൻസ് പരിരക്ഷ.",
        benefits: "പ്രതിവർഷം കുടുംബത്തിന് 5 ലക്ഷം രൂപ വരെ സൗജന്യ ചികിത്സാ പരിരക്ഷ.",
        officialUrl: "https://pmjay.gov.in"
      },
      {
        id: "pm-kisan",
        title: "പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി (PM-KISAN)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "കാർഷിക-കർഷക ക്ഷേമ മന്ത്രാലയം",
        summary: "ഭൂവുടമകളായ കർഷക കുടുംബങ്ങൾക്ക് വർഷം തോറും നേരിട്ടുള്ള സാമ്പത്തിക സുരക്ഷാ സഹായം.",
        benefits: "വർഷത്തിൽ ₹6,000 (3 ഗഡുക്കളായി ₹2,000 വീതം ബാങ്ക് അക്കൗണ്ടിലേക്ക്).",
        officialUrl: "https://pmkisan.gov.in"
      },
      {
        id: "pmay-urban",
        title: "പ്രധാനമന്ത്രി ആവാസ് യോജന (PMAY-നഗരം 2.0)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 900000,
        ministry: "ഭവന-നഗരകാര്യ മന്ത്രാലയം",
        summary: "സാധാരണക്കാർക്ക് സുരക്ഷിതമായ കോൺക്രീറ്റ് വീട് നിർമ്മിക്കുന്നതിന് പലിശ സബ്‌സിഡി.",
        benefits: "വീട് നിർമ്മാണത്തിനോ ഭവനവായ്പക്കോ ₹2.5 ലക്ഷം രൂപ വരെ സർക്കാർ സബ്‌സിഡി.",
        officialUrl: "https://pmay-urban.gov.in"
      },
      {
        id: "pm-mudra",
        title: "പ്രധാനമന്ത്രി മുദ്ര യോജന (PMMY)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "ധനകാര്യ മന്ത്രാലയം",
        summary: "ചെറുകിട വ്യവസായ സംരംഭകർക്ക് ഈടില്ലാതെ ലഭിക്കുന്ന ബാങ്ക് ബിസിനസ് വായ്പ.",
        benefits: "ഷിഷു, കിഷോർ, തരുൺ വിഭാഗങ്ങളിലായി ₹20 ലക്ഷം രൂപ വരെ ഈടില്ലാത്ത വായ്പ.",
        officialUrl: "https://www.mudra.org.in"
      },
      {
        id: "pm-vishwakarma",
        title: "പിഎം വിശ്വകർമ കൗശൽ സമ്മാൻ",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "എംഎസ്എംഇ മന്ത്രാലയം",
        summary: "18 പരമ്പരാഗത കരകൗശല വിദഗ്ധർക്കും തൊഴിലാളികൾക്കും നൈപുണ്യ പരിശീലനവും വായ്പയും.",
        benefits: "₹15,000 ടൂൾകിറ്റ് സഹായം + ₹500 പ്രതിദിന അലവൻസ് + 5% പലിശയിൽ ₹3 ലക്ഷം വായ്പ.",
        officialUrl: "https://pmvishwakarma.gov.in"
      },
      {
        id: "nsp-post-matric",
        title: "പോസ്റ്റ്-മെട്രിക് സ്കോളർഷിപ്പ് (SC/ST/OBC)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "SC/ST/OBC",
        maxIncome: 250000,
        ministry: "സാമൂഹിക നീതി മന്ത്രാലയം",
        summary: "ഉന്നത വിദ്യാഭ്യാസത്തിനും ഡിഗ്രി പഠനത്തിനും നിർബന്ധിത ട്യൂഷൻ ഫീസ് റീഇംബേഴ്സ്മെന്റ്.",
        benefits: "100% ട്യൂഷൻ ഫീസ് ഇളവ് + പ്രതിമാസ ജീവിതച്ചെലവ് അലവൻസ്.",
        officialUrl: "https://scholarships.gov.in"
      },
      {
        id: "pmkvy-4",
        title: "പ്രധാനമന്ത്രി കൗശൽ വികാസ് യോജന (PMKVY 4.0)",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 9999999,
        ministry: "നൈപുണ്യ വികസന മന്ത്രാലയം",
        summary: "എഐ, റോബോട്ടിക്സ്, ഡ്രോൺ സാങ്കേതികവിദ്യകളിൽ സൗജന്യ അംഗീകൃത പരിശീലനം.",
        benefits: "സൗജന്യ നൈപുണ്യ പരിശീലനം + കേന്ദ്ര സർക്കാർ സർട്ടിഫിക്കറ്റ് + തൊഴിൽ സഹായം.",
        officialUrl: "https://www.pmkvyofficial.org"
      },
      {
        id: "standup-india",
        title: "സ്റ്റാൻഡ്-അപ്പ് ഇന്ത്യ പദ്ധതി (വനിതകൾ & SC/ST)",
        level: "Central",
        state: "All India",
        category: "Women",
        caste: "All",
        maxIncome: 9999999,
        ministry: "സാമ്പത്തിക സേവന വകുപ്പ്",
        summary: "പുതിയ വ്യവസായ നിർമ്മാണ സംരംഭങ്ങൾ ആരംഭിക്കുന്നതിനുള്ള വായ്പാ പദ്ധതി.",
        benefits: "വനിതാ സംരംഭകർക്ക് ₹10 ലക്ഷം മുതൽ ₹1 കോടി വരെ ബാങ്ക് വായ്പ സഹായം.",
        officialUrl: "https://www.standupmitra.in"
      },
      {
        id: "kisan-credit-card",
        title: "കിസാൻ ക്രെഡിറ്റ് കാർഡ് (KCC) കാർഷിക വായ്പ",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "കാർഷിക മന്ത്രാലയം",
        summary: "കൃഷി, ക്ഷീരമേഖല, മത്സ്യബന്ധനം എന്നിവക്ക് കുറഞ്ഞ പലിശയിൽ പ്രവർത്തന മൂലധനം.",
        benefits: "കൃത്യമായി തിരിച്ചടച്ചാൽ 4% പലിശ നിരക്കിൽ ₹3 ലക്ഷം രൂപ വരെ വായ്പ.",
        officialUrl: "https://myscheme.gov.in"
      },
      {
        id: "pm-fasal-bima",
        title: "പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന (PMFBY)",
        level: "Central",
        state: "All India",
        category: "Farmers",
        caste: "All",
        maxIncome: 9999999,
        ministry: "കാർഷിക മന്ത്രാലയം",
        summary: "പ്രകൃതിക്ഷോഭങ്ങൾ മൂലമുണ്ടാകുന്ന കാർഷിക വിളനാശങ്ങൾക്ക് പൂർണ്ണ ഇൻഷുറൻസ് സംരക്ഷണം.",
        benefits: "കർഷകർക്ക് കുറഞ്ഞ പ്രീമിയം (1.5% - 2%); ബാക്കി തുക സർക്കാർ നൽകുന്നു.",
        officialUrl: "https://pmfby.gov.in"
      },
      {
        id: "pm-svanidhi",
        title: "പിഎം സ്വനിധി തെരുവ് കച്ചവട വായ്പാ പദ്ധതി",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 250000,
        ministry: "ഭവന-നഗരകാര്യ മന്ത്രാലയം",
        summary: "തെരുവ് കച്ചവടക്കാർക്ക് കച്ചവടം വിപുലീകരിക്കാൻ ഈടില്ലാത്ത ചെറിയ വായ്പകൾ.",
        benefits: "₹50,000 വരെ ഈടില്ലാത്ത വായ്പ + 7% പലിശ സബ്‌സിഡിയും ക്യാഷ്ബാക്കും.",
        officialUrl: "https://pmsvanidhi.mohua.gov.in"
      },
      {
        id: "pmegp-scheme",
        title: "പ്രധാനമന്ത്രി തൊഴിൽ സൃഷ്ടി പദ്ധതി (PMEGP)",
        level: "Central",
        state: "All India",
        category: "Entrepreneurs",
        caste: "All",
        maxIncome: 9999999,
        ministry: "എംഎസ്എംഇ മന്ത്രാലയം",
        summary: "പുതിയ വ്യവസായ സംരംഭങ്ങൾ ആരംഭിക്കുന്നതിന് സബ്‌സിഡിയോട് കൂടിയ വായ്പ.",
        benefits: "₹50 ലക്ഷം വരെയുള്ള പ്രോജക്റ്റുകൾക്ക് 15% മുതൽ 35% വരെ സർക്കാർ സബ്‌സിഡി.",
        officialUrl: "https://www.kviconline.gov.in"
      },
      {
        id: "aicte-pragati",
        title: "AICTE പ്രഗതി സാങ്കേതിക വിദ്യാഭ്യാസ സ്കോളർഷിപ്പ്",
        level: "Central",
        state: "All India",
        category: "Students",
        caste: "All",
        maxIncome: 800000,
        ministry: "വിദ്യാഭ്യാസ മന്ത്രാലയം",
        summary: "എഞ്ചിനീയറിംഗ്, പോളിടെക്നിക് പഠനത്തിന് ചേരുന്ന പെൺകുട്ടികൾക്ക് സാമ്പത്തിക സഹായം.",
        benefits: "ഫീസ്, ലാപ്ടോപ്പ്, പുസ്തകങ്ങൾ എന്നിവക്കായി പ്രതിവർഷം ₹50,000 രൂപ.",
        officialUrl: "https://www.aicte-india.org"
      }
    ]
  };

  const statesList = [
    "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra", "Delhi",
    "Andhra Pradesh", "Telangana", "Uttar Pradesh", "Gujarat", "Rajasthan",
    "Madhya Pradesh", "West Bengal", "Bihar", "Punjab", "Haryana",
    "Odisha", "Assam", "Jharkhand", "Chhattisgarh", "Uttarakhand",
    "Himachal Pradesh", "Goa", "Puducherry", "Jammu and Kashmir"
  ];

  // State Template Generators localized across all 4 languages
  const stateTemplatesMultiLang = {
    en: [
      { category: "Students", caste: "All", maxIncome: 400000, suffix: "Chief Minister Higher Education Fellowship", dept: "Dept of Higher Education", summary: "State scholarship granting fee waivers and laptop allowances.", benefits: "₹25,000 annual grant + free coaching." },
      { category: "Students", caste: "SC/ST/OBC", maxIncome: 250000, suffix: "Merit-cum-Means Degree Scholarship", dept: "Backward Classes Welfare Dept", summary: "Tuition reimbursement and monthly allowance for youth.", benefits: "Full tuition reimbursement + ₹1,200/month." },
      { category: "Women", caste: "All", maxIncome: 250000, suffix: "Mahila Livelihood & Income Scheme", dept: "Women & Child Development", summary: "Direct monthly financial support to household women heads.", benefits: "₹1,200 - ₹1,500 monthly DBT transfer." },
      { category: "Women", caste: "All", maxIncome: 500000, suffix: "Kanya Degree Graduation Incentive", dept: "Social Welfare Dept", summary: "Cash reward on successful college undergraduate degree completion.", benefits: "₹20,000 graduation award + free transit pass." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "Solar Agri Pump & Irrigation Subsidy", dept: "Dept of Agriculture", summary: "Equips farms with high-efficiency solar water pumps and drip irrigation.", benefits: "70% capital equipment subsidy." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "Farmer Crop Protection & Input Grant", dept: "Agriculture Directorate", summary: "Subsidized certified seeds, fertilizers, and emergency relief.", benefits: "₹5,000 per acre agricultural input grant." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "Youth Entrepreneur Capital Subsidy", dept: "Dept of MSME & Industries", summary: "Subsidizes project setup capital for first-generation founders.", benefits: "25% capital margin subsidy up to ₹25 Lakhs." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 300000, suffix: "Traditional Artisan Livelihood Grant", dept: "Handloom & Handicrafts Dept", summary: "Financial support and modern tooling for craft clusters.", benefits: "₹10,000 raw material grant + subsidized credit." },
      { category: "Students", caste: "All", maxIncome: 800000, suffix: "Digital Student Smart Device Initiative", dept: "IT & Higher Education Dept", summary: "Distributes smart digital tablet devices for digital coursework.", benefits: "Free tablet computer + 2 yrs internet vouchers." },
      { category: "Women", caste: "SC/ST/OBC", maxIncome: 200000, suffix: "Women Self Help Group Revolving Fund", dept: "Rural Livelihood Mission", summary: "Zero-interest credit lines and equipment grants for rural women.", benefits: "₹50,000 revolving grant per SHG cooperative." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "Dairy & Livestock Cattle Subsidy", dept: "Animal Husbandry Dept", summary: "Financial support for acquiring high-yield dairy cattle.", benefits: "50% purchase grant on livestock + free vet care." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "Innovation Startup Seed Fund", dept: "Dept of Science & Technology", summary: "Early-stage prototype grant for university-born startups.", benefits: "₹5,00,000 equity-free seed prototyping grant." }
    ],
    ta: [
      { category: "Students", caste: "All", maxIncome: 400000, suffix: "முதலமைச்சர் உயர்கல்வி உதவித்தொகை திட்டம்", dept: "உயர்கல்வித் துறை", summary: "கல்லூரி மாணவர்களுக்கான கல்விக் கட்டண விலக்கு மற்றும் மடிக்கணினி மானியம்.", benefits: "ஆண்டுக்கு ₹25,000 கல்வி உதவித்தொகை + இலவச பயிற்சி." },
      { category: "Students", caste: "SC/ST/OBC", maxIncome: 250000, suffix: "பிற்படுத்தப்பட்டோர் பட்டப்படிப்பு கல்வி உதவித்தொகை", dept: "பிற்படுத்தப்பட்டோர் நலத்துறை", summary: "இளங்கலை பயிலும் மாணவர்களுக்கு முழுக் கட்டணத் திருப்பிச் செலுத்துகை.", benefits: "முழு கல்விக் கட்டண விலக்கு + மாதம் ₹1,200 படித்தொகை." },
      { category: "Women", caste: "All", maxIncome: 250000, suffix: "மகளிர் உரிமை மற்றும் வாழ்வாதார மாதாந்திர திட்டம்", dept: "சமூக நலம் & மகளிர் உரிமைத் துறை", summary: "குடும்பத் தலைவிகளுக்கு வழங்கப்படும் மாதாந்திர நேரடி வங்கி உதவித்தொகை.", benefits: "மாதம் ₹1,200 முதல் ₹1,500 வரை வங்கி கணக்கில் வரவு (DBT)." },
      { category: "Women", caste: "All", maxIncome: 500000, suffix: "மாணவிகள் பட்டப்படிப்பு ஊக்குவிப்பு திட்டம்", dept: "சமூக நலத்துறை", summary: "கல்லூரி படிப்பை வெற்றிகரமாக முடிக்கும் மாணவிகளுக்கு சிறப்பு ஊக்கத்தொகை.", benefits: "ரூ. 20,000 ரொக்கப் பரிசு + இலவச பேருந்து பயண அட்டை." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "சூரிய சக்தி பாசன பம்ப் மானியத் திட்டம்", dept: "வேளாண்மை மற்றும் பாசனத் துறை", summary: "விவசாயிகளுக்கு சோலார் மோட்டார் பம்புகள் மற்றும் சொட்டு நீர் பாசன உதவி.", benefits: "70% உபகரண மானியம் + இலவச மண் பரிசோதனை அட்டை." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "விவசாய இடுபொருள் மற்றும் பயிர் பாதுகாப்பு திட்டம்", dept: "வேளாண் துறை இயக்ககம்", summary: "மானிய விலையில் தரமான விதைகள், உரங்கள் மற்றும் பூச்சி மருந்து உதவி.", benefits: "ஏக்கருக்கு ₹5,000 வேளாண் இடுபொருள் நேரடி உதவி." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "இளைஞர் தொழில் முனைவோர் மூலதன மானியம்", dept: "MSME மற்றும் தொழில்துறை", summary: "புதிய தொழில் தொடங்கும் இளைஞர்களுக்கான திட்ட முதலீட்டு மானியம்.", benefits: "25% மூலதன மானியம் (₹25 லட்சம் வரை) + 3% வட்டி தள்ளுபடி." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 300000, suffix: "பாரம்பரிய கைவினைஞர் வாழ்வாதார உதவி", dept: "கைத்தறி மற்றும் கைவினைப் பொருட்கள் துறை", summary: "நெசவாளர்கள் மற்றும் பாரம்பரிய கலைஞர்களுக்கான நிதி உதவி திட்டம்.", benefits: "₹10,000 மூலப்பொருள் மானியம் + எளிய வங்கி கடன்." },
      { category: "Students", caste: "All", maxIncome: 800000, suffix: "மாணவர் டிஜிட்டல் டேப்லெட் கற்றல் திட்டம்", dept: "தகவல் தொழில்நுட்பம் & கல்வித் துறை", summary: "மாணவர்களுக்கு டிஜிட்டல் கல்வி பயில இலவச டேப்லெட் கணினி வழங்கும் திட்டம்.", benefits: "100% இலவச டேப்லெட் சாதனம் + 2 வருட இலவச இணைய சேவை." },
      { category: "Women", caste: "SC/ST/OBC", maxIncome: 200000, suffix: "மகளிர் சுய உதவிக் குழு சுழல் நிதி திட்டம்", dept: "ஊரக வாழ்வாதார இயக்கம்", summary: "கிராமப்புற பெண்கள் சுயதொழில் தொடங்க வட்டியில்லா கடன் நிதி.", benefits: "சுய உதவிக் குழுவிற்கு ₹50,000 சுழல் நிதி மானியம்." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "கால்நடை மற்றும் கறவை மாடு வளர்ப்பு மானியம்", dept: "கால்நடை பராமரிப்புத் துறை", summary: "பால் உற்பத்தியை பெருக்க கறவை மாடுகள் வாங்க விவசாயிகளுக்கு அரசு உதவி.", benefits: "50% கொள்முதல் மானியம் + இலவச கால்நடை மருத்துவ சிகிச்சை." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "ஸ்டார்ட்அப் புத்தாக்க விதை நிதி உதவி", dept: "அறிவியல் மற்றும் தொழில்நுட்பத் துறை", summary: "கல்லூரி கண்டுபிடிப்பாளர்கள் மற்றும் ஸ்டார்ட்அப் நிறுவனங்களுக்கான நிதி.", benefits: "ரூ. 5,00,000 வரை திருப்பிச் செலுத்தத் தேவையில்லாத விதை நிதி." }
    ],
    hi: [
      { category: "Students", caste: "All", maxIncome: 400000, suffix: "मुख्यमंत्री उच्च शिक्षा एवं मेधावी छात्रवृत्ति", dept: "उच्च शिक्षा विभाग", summary: "कॉलेज छात्रों के लिए शिक्षण शुल्क में पूर्ण छूट एवं लैपटॉप सहायता।", benefits: "₹25,000 वार्षिक छात्रवृत्ति + निःशुल्क कोचिंग।" },
      { category: "Students", caste: "SC/ST/OBC", maxIncome: 250000, suffix: "मेधावी डिग्री पोस्ट-मैट्रिक अनुदान योजना", dept: "पिछड़ा वर्ग कल्याण विभाग", summary: "वंचित वर्ग के छात्रों के लिए डिग्री कॉलेज की ट्यूशन फीस प्रतिपूर्ति।", benefits: "100% कॉलेज फीस प्रतिपूर्ति + ₹1,200 मासिक भत्ता।" },
      { category: "Women", caste: "All", maxIncome: 250000, suffix: "महिला सशक्तिकरण एवं मासिक आजीविका योजना", dept: "महिला एवं बाल विकास विभाग", summary: "परिवार की महिला मुखियाओं के पोषण और संबल हेतु प्रत्यक्ष मासिक सहायता।", benefits: "₹1,200 से ₹1,500 प्रति माह सीधे बैंक खाते में (डीबीटी)।" },
      { category: "Women", caste: "All", maxIncome: 500000, suffix: "कन्या स्नातक शिक्षा प्रोत्साहन योजना", dept: "समाज कल्याण विभाग", summary: "सफलतापूर्वक कॉलेज ग्रेजुएशन पूरा करने पर छात्राओं को विशेष वित्तीय प्रोत्साहन।", benefits: "₹20,000 एकमुश्त उपाधि पुरस्कार + निःशुल्क बस पास।" },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "सौर कृषि पंप एवं सूक्ष्म सिंचाई सब्सिडी", dept: "कृषि एवं जल संसाधन विभाग", summary: "किसानों को उच्च दक्षता वाले सोलर सिंचाई पंप और ड्रिप सिस्टम प्रदान करना।", benefits: "70% उपकरण पूंजी सब्सिडी + मुफ्त मृदा परीक्षण।" },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "कृषक फसल सुरक्षा एवं इनपुट प्रोत्साहन सहायता", dept: "कृषि निदेशालय", summary: "प्रमाणित बीज, उर्वरक और आकस्मिक आपदा राहत हेतु सीधी आर्थिक मदद।", benefits: "₹5,000 प्रति एकड़ कृषि इनपुट सीधी सहायता।" },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "युवा उद्यमी मार्जिन पूंजी सब्सिडी", dept: "एमएसएमई एवं उद्योग विभाग", summary: "प्रथम पीढ़ी के युवा उद्यमियों को नया उद्योग लगाने हेतु पूंजीगत अनुदान।", benefits: "25% पूंजीगत सब्सिडी (अधिकतम ₹25 लाख) + 3% ब्याज छूट।" },
      { category: "Entrepreneurs", caste: "All", maxIncome: 300000, suffix: "पारंपरिक शिल्पकार एवं दस्तकार आजीविका अनुदान", dept: "हथकरघा एवं हस्तशिल्प विभाग", summary: "बुनकरों और पारंपरिक कारीगरों के लिए टूलकिट और कार्यशील पूंजी।", benefits: "₹10,000 कच्चा माल अनुदान + रियायती बैंक ऋण।" },
      { category: "Students", caste: "All", maxIncome: 800000, suffix: "डिजिटल छात्र निःशुल्क टैबलेट योजना", dept: "सूचना प्रौद्योगिकी एवं शिक्षा विभाग", summary: "कॉलेज विद्यार्थियों को ऑनलाइन पढ़ाई के लिए स्मार्ट टैबलेट का वितरण।", benefits: "100% मुफ्त डिजिटल टैबलेट + 2 वर्ष का मुफ्त इंटरनेट वाउचर।" },
      { category: "Women", caste: "SC/ST/OBC", maxIncome: 200000, suffix: "महिला स्वयं सहायता समूह रिवॉल्विंग फंड", dept: "ग्रामीण आजीविका मिशन", summary: "ग्रामीण महिलाओं को सामूहिक रोजगार स्थापित करने हेतु ब्याज-मुक्त कर्ज।", benefits: "₹50,000 प्रति स्वयं सहायता समूह आवर्ती अनुदान।" },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "दुग्ध एवं पशुधन विकास सब्सिडी", dept: "पशुपालन एवं डेयरी विभाग", summary: "उन्नत नस्ल के दुधारू पशु खरीदने हेतु पशुपालकों को वित्तीय सहायता।", benefits: "पशु खरीद पर 50% सरकारी अनुदान + मुफ्त पशु चिकित्सा।" },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "स्टार्टअप नवाचार सीड कैपिटल फंड", dept: "विज्ञान एवं प्रौद्योगिकी विभाग", summary: "छात्रों एवं युवाओं के नए तकनीकी प्रोटोटाइप स्टार्टअप हेतु सीड ग्रांट।", benefits: "₹5,00,000 तक का बिना इक्विटी वाला सीड प्रोटोटाइप अनुदान।" }
    ],
    ml: [
      { category: "Students", caste: "All", maxIncome: 400000, suffix: "മുഖ്യമന്ത്രിയുടെ ഉന്നത വിദ്യാഭ്യാസ ഫെല്ലോഷിപ്പ്", dept: "ഉന്നത വിദ്യാഭ്യാസ വകുപ്പ്", summary: "കോളേജ് വിദ്യാർത്ഥികൾക്ക് ട്യൂഷൻ ഫീസ് ഇളവും ലാപ്ടോപ്പ് ഗ്രാന്റും.", benefits: "പ്രതിവർഷം ₹25,000 സ്കോളർഷിപ്പ് + സൗജന്യ കോച്ചിംഗ്." },
      { category: "Students", caste: "SC/ST/OBC", maxIncome: 250000, suffix: "മെറിറ്റ്-കം-മീൻസ് ഡിഗ്രി സ്കോളർഷിപ്പ്", dept: "പിന്നാക്ക വിഭാഗ വികസന വകുപ്പ്", summary: "പിന്നാക്ക വിഭാഗങ്ങളിലെ വിദ്യാർത്ഥികൾക്ക് കോളേജ് ഫീസ് തിരികെ നൽകുന്നു.", benefits: "പൂർണ്ണ ട്യൂഷൻ ഫീസ് ഇളവ് + പ്രതിമാസം ₹1,200 അലവൻസ്." },
      { category: "Women", caste: "All", maxIncome: 250000, suffix: "മഹിളാ പ്രതിമാസ വരുമാന സുരക്ഷാ പദ്ധതി", dept: "വനിതാ ശിശു വികസന വകുപ്പ്", summary: "കുടുംബനാഥകളായ സ്ത്രീകൾക്ക് പ്രതിമാസം നേരിട്ട് നൽകുന്ന സാമ്പത്തിക സഹായം.", benefits: "പ്രതിമാസം ₹1,200 മുതൽ ₹1,500 വരെ അക്കൗണ്ടിലേക്ക് നേരിട്ട് (DBT)." },
      { category: "Women", caste: "All", maxIncome: 500000, suffix: "പെൺകുട്ടികളുടെ ബിരുദ വിദ്യാഭ്യാസ ഇൻസെന്റീവ്", dept: "സാമൂഹ്യക്ഷേമ വകുപ്പ്", summary: "കോളേജ് പഠനം പൂർത്തിയാക്കുന്ന പെൺകുട്ടികൾക്ക് സാമ്പത്തിക അവാർഡ്.", benefits: "₹20,000 ക്യാഷ് അവാർഡ് + സൗജന്യ യാത്രാ പാസ്." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "സോളാർ കാർഷിക പമ്പ് & ഇറിഗേഷൻ സബ്‌സിഡി", dept: "കൃഷി-ജലവിഭവ വകുപ്പ്", summary: "കർഷകർക്ക് ഉയർന്ന ശേഷിയുള്ള സോളാർ പമ്പുകളും തുള്ളിനന സംവിധാനങ്ങളും.", benefits: "70% വരെ ഉപകരണ സബ്‌സിഡി + സൗജന്യ മണ്ണ് പരിശോധന." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "കർഷക വിള സംരക്ഷണ ഇൻപുട്ട് ഗ്രാന്റ്", dept: "കൃഷി വകുപ്പ്", summary: "ഗുണനിലവാരമുള്ള വിത്തുകൾ, വളങ്ങൾ എന്നിവക്ക് കർഷകർക്ക് ധനസഹായം.", benefits: "ഏക്കറിന് ₹5,000 നേരിട്ടുള്ള കാർഷിക ഇൻപുട്ട് ഗ്രാന്റ്." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "യുവ സംരംഭക ക്യാപിറ്റൽ മാർജിൻ സബ്‌സിഡി", dept: "വ്യവസായ-എംഎസ്എംഇ വകുപ്പ്", summary: "പുതിയ വ്യവസായ യൂണിറ്റുകൾ ആരംഭിക്കുന്ന യുവാക്കൾക്കുള്ള സബ്‌സിഡി.", benefits: "₹25 ലക്ഷം വരെ 25% മൂലധന സബ്‌സിഡി + 3% പലിശ ഇളവ്." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 300000, suffix: "പരമ്പരാഗത കരകൗശല ഉപജീവന സഹായം", dept: "കൈത്തറി-കരകൗശല വകുപ്പ്", summary: "പരമ്പരാഗത തൊഴിലാളികൾക്കും നെയ്ത്തുകാർക്കും സാമ്പത്തിക ആശ്വാസം.", benefits: "₹10,000 അസംസ്കൃത വസ്തു ഗ്രാന്റ് + കുറഞ്ഞ പലിശയിൽ വായ്പ." },
      { category: "Students", caste: "All", maxIncome: 800000, suffix: "ഡിജിറ്റൽ സ്റ്റുഡന്റ് സൗജന്യ ടാബ്‌ലെറ്റ് പദ്ധതി", dept: "ഐടി & വിദ്യാഭ്യാസ വകുപ്പ്", summary: "ഓൺലൈൻ പഠനത്തിനായി വിദ്യാർത്ഥികൾക്ക് സ്മാർട്ട് ടാബ്‌ലെറ്റുകൾ നൽകുന്നു.", benefits: "100% സൗജന്യ ടാബ്‌ലെറ്റ് കമ്പ്യൂട്ടർ + 2 വർഷത്തെ ഇന്റർനെറ്റ്." },
      { category: "Women", caste: "SC/ST/OBC", maxIncome: 200000, suffix: "വനിതാ സ്വയംസഹായ സംഘം റിവോൾവിംഗ് ഫണ്ട്", dept: "ഗ്രാമീണ ഉപജീവന ദൗത്യം", summary: "ഗ്രാമീണ സ്ത്രീകൾക്ക് സംരംഭങ്ങൾ ആരംഭിക്കാൻ പലിശരഹിത റിവോൾവിംഗ് ഫണ്ട്.", benefits: "ഓരോ അയൽക്കൂട്ടത്തിനും ₹50,000 റിവോൾവിംഗ് ഫണ്ട് ഗ്രാന്റ്." },
      { category: "Farmers", caste: "All", maxIncome: 9999999, suffix: "ക്ഷീരമേഖല കന്നുകാലി വികസന സബ്‌സിഡി", dept: "മൃഗസംരക്ഷണ വകുപ്പ്", summary: "കറവപ്പശുക്കളെ വാങ്ങാൻ കർഷകർക്ക് പ്രത്യേക സർക്കാർ ധനസഹായം.", benefits: "50% വാങ്ങൽ സബ്‌സിഡി + സൗജന്യ വെറ്ററിനറി പരിചരണം." },
      { category: "Entrepreneurs", caste: "All", maxIncome: 9999999, suffix: "സ്റ്റാർട്ടപ്പ് ഇന്നൊവേഷൻ സീഡ് ഫണ്ട്", dept: "ശാസ്ത്ര സാങ്കേതിക വകുപ്പ്", summary: "പുതിയ സാങ്കേതിക പ്രോട്ടോടൈപ്പുകൾക്ക് നൽകുന്ന പ്രാരംഭ ധനസഹായം.", benefits: "₹5,00,000 രൂപയുടെ സീഡ് ഫണ്ട് പ്രോട്ടോടൈപ്പിംഗ് ഗ്രാന്റ്." }
    ]
  };

  // Dynamically compiles all 300+ schemes in the requested language
  function getCompiledMasterSchemes(lang) {
    const validLang = stateTemplatesMultiLang[lang] ? lang : 'en';
    const central = centralSchemesData[validLang] || centralSchemesData['en'];
    const templates = stateTemplatesMultiLang[validLang];

    const list = [...central];

    statesList.forEach((stateName, sIdx) => {
      templates.forEach((tpl, tIdx) => {
        list.push({
          id: `sch_${sIdx + 1}_${tIdx + 1}`,
          title: `${stateName} ${tpl.suffix}`,
          level: "State",
          state: stateName,
          category: tpl.category,
          caste: tpl.caste,
          maxIncome: tpl.maxIncome,
          ministry: `${tpl.dept}, ${stateName}`,
          summary: `${tpl.summary} (${stateName})`,
          benefits: tpl.benefits,
          officialUrl: "https://myscheme.gov.in"
        });
      });
    });

    return list;
  }

  // ========================================================
  // 2. DOM ELEMENTS
  // ========================================================
  const langSelect = document.getElementById('langSelect');
  const citizenDashboardView = document.getElementById('citizenDashboardView');
  const adminDashboardView = document.getElementById('adminDashboardView');

  const schemesGrid = document.getElementById('schemesGrid');
  const searchInput = document.getElementById('searchInput');
  const stateSelect = document.getElementById('stateSelect');
  const filterChips = document.querySelectorAll('.chip-btn');
  const schemeCount = document.getElementById('schemeCount');
  const paginationBar = document.getElementById('paginationBar');

  const profileSetupPrompt = document.getElementById('profileSetupPrompt');
  const profileSummaryBanner = document.getElementById('profileSummaryBanner');
  const profileSummaryText = document.getElementById('profileSummaryText');
  const profileForm = document.getElementById('profileForm');

  const adminLoginModal = document.getElementById('adminLoginModal');
  const profileModal = document.getElementById('profileModal');
  const feedbackModal = document.getElementById('feedbackModal');
  const detailsModal = document.getElementById('detailsModal');

  const adminLoginForm = document.getElementById('adminLoginForm');
  const citizenFeedbackForm = document.getElementById('citizenFeedbackForm');
  const addSchemeForm = document.getElementById('addSchemeForm');

  const statVisitors = document.getElementById('statVisitors');
  const statSchemes = document.getElementById('statSchemes');
  const statFeedbacks = document.getElementById('statFeedbacks');
  const adminFeedbacksTableBody = document.getElementById('adminFeedbacksTableBody');
  const adminSchemesTableBody = document.getElementById('adminSchemesTableBody');

  let activeCategory = 'All';
  let currentPage = 1;
  const ITEMS_PER_PAGE = 15;

  // ========================================================
  // 3. MULTI-LANGUAGE TRANSLATION CONTROLLER
  // ========================================================
  function applyLanguage(lang) {
    if (typeof I18N === 'undefined' || !I18N[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('ss_language', lang);

    if (langSelect) langSelect.value = lang;
    const t = I18N[lang];

    // Navbar & Hero
    const fbBtn = document.getElementById('feedbackNavBtn');
    if (fbBtn) fbBtn.textContent = t.feedbackNav;
    const heroPill = document.getElementById('heroPill');
    if (heroPill) heroPill.textContent = t.heroPill;
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) heroTitle.textContent = t.heroTitle;
    const heroSub = document.getElementById('heroSubtitle');
    if (heroSub) heroSub.textContent = t.heroSubtitle;
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    // Personalization Prompt & Banner
    const pTitle = document.getElementById('profilePromptTitle');
    if (pTitle) pTitle.textContent = t.profilePromptTitle;
    const pSub = document.getElementById('profilePromptSubtitle');
    if (pSub) pSub.textContent = t.profilePromptSubtitle;
    const pBtn = document.getElementById('personalizeBtn');
    if (pBtn) pBtn.textContent = t.personalizeBtn;
    const matchLbl = document.getElementById('matchActiveLabel');
    if (matchLbl) matchLbl.textContent = t.matchActive;
    const chgBtn = document.getElementById('changeDetailsBtn');
    if (chgBtn) chgBtn.textContent = t.changeDetails;
    const rstBtn = document.getElementById('resetProfileBtn');
    if (rstBtn) rstBtn.textContent = t.reset;

    // Category Chips & Dropdown
    const chipAll = document.getElementById('chipAll');
    if (chipAll) chipAll.textContent = t.catAll;
    const chipStudents = document.getElementById('chipStudents');
    if (chipStudents) chipStudents.textContent = t.catStudents;
    const chipWomen = document.getElementById('chipWomen');
    if (chipWomen) chipWomen.textContent = t.catWomen;
    const chipFarmers = document.getElementById('chipFarmers');
    if (chipFarmers) chipFarmers.textContent = t.catFarmers;
    const chipBiz = document.getElementById('chipBiz');
    if (chipBiz) chipBiz.textContent = t.catBiz;
    const optAllStates = document.getElementById('optAllStates');
    if (optAllStates) optAllStates.textContent = t.allStates;

    // Section & Footer
    const availLabel = document.getElementById('availableSchemesLabel');
    if (availLabel) availLabel.textContent = t.availableSchemes;
    const footerText = document.getElementById('footerText');
    if (footerText) footerText.textContent = t.footerText;

    // Modals
    const pModTitle = document.getElementById('profileModalTitle');
    if (pModTitle) pModTitle.textContent = t.profileModalTitle;
    const pModSub = document.getElementById('profileModalSub');
    if (pModSub) pModSub.textContent = t.profileModalSub;
    const lblAge = document.getElementById('lblAge');
    if (lblAge) lblAge.textContent = t.lblAge;
    const lblOcc = document.getElementById('lblOccupation');
    if (lblOcc) lblOcc.textContent = t.lblOccupation;
    const lblCaste = document.getElementById('lblCaste');
    if (lblCaste) lblCaste.textContent = t.lblCaste;
    const lblInc = document.getElementById('lblIncome');
    if (lblInc) lblInc.textContent = t.lblIncome;
    const sProfBtn = document.getElementById('saveProfileBtn');
    if (sProfBtn) sProfBtn.textContent = t.saveProfileBtn;

    const fbModTitle = document.getElementById('feedbackModalTitle');
    if (fbModTitle) fbModTitle.textContent = t.feedbackModalTitle;
    const fbModSub = document.getElementById('feedbackModalSub');
    if (fbModSub) fbModSub.textContent = t.feedbackModalSub;
    const lblType = document.getElementById('lblType');
    if (lblType) lblType.innerHTML = `${t.lblType} <span style="color: var(--danger);">*</span>`;
    const lblName = document.getElementById('lblName');
    if (lblName) lblName.innerHTML = `${t.lblName} <span style="color: var(--danger);">*</span>`;
    const lblEmail = document.getElementById('lblEmail');
    if (lblEmail) lblEmail.innerHTML = `${t.lblEmail} <span style="color: var(--danger);">*</span>`;
    const lblSch = document.getElementById('lblScheme');
    if (lblSch) lblSch.innerHTML = `${t.lblScheme} <span style="color: var(--danger);">*</span>`;
    const lblMsg = document.getElementById('lblMessage');
    if (lblMsg) lblMsg.innerHTML = `${t.lblMessage} <span style="color: var(--danger);">*</span>`;
    const subFbBtn = document.getElementById('submitFeedbackBtn');
    if (subFbBtn) subFbBtn.textContent = t.submitFeedbackBtn;

    // Re-render schemes in new language
    renderCitizenSchemes();
  }

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });
  }

  function getAllSchemes() {
    const custom = JSON.parse(localStorage.getItem('ss_custom_schemes') || '[]');
    const deleted = JSON.parse(localStorage.getItem('ss_deleted_schemes') || '[]');
    const masterInCurrentLang = getCompiledMasterSchemes(currentLang);
    const merged = [...custom, ...masterInCurrentLang];
    return merged.filter(s => !deleted.includes(s.id));
  }

  // ========================================================
  // 4. CITIZEN DASHBOARD & PAGINATION
  // ========================================================
  if (searchInput) {
    searchInput.addEventListener('input', () => { currentPage = 1; renderCitizenSchemes(); });
  }
  if (stateSelect) {
    stateSelect.addEventListener('change', () => { currentPage = 1; renderCitizenSchemes(); });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      currentPage = 1;
      renderCitizenSchemes();
    });
  });

  function getFilteredSchemes() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedState = stateSelect ? stateSelect.value : '';
    const all = getAllSchemes();

    return all.filter(item => {
      const matchSearch = item.title.toLowerCase().includes(query) ||
                          item.ministry.toLowerCase().includes(query) ||
                          item.summary.toLowerCase().includes(query);

      const matchCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchState = !selectedState || item.state === selectedState || item.state === 'All India';

      return matchSearch && matchCategory && matchState;
    });
  }

  function renderCitizenSchemes() {
    if (!schemesGrid) return;
    const t = (typeof I18N !== 'undefined' && I18N[currentLang]) ? I18N[currentLang] : I18N['en'];

    const userProfile = (typeof DB !== 'undefined') ? DB.getSavedProfile() : null;
    let filtered = getFilteredSchemes();

    filtered = filtered.map(scheme => {
      let isAutoMatched = false;
      if (userProfile) {
        const matchesCategory = scheme.category === userProfile.occupation || scheme.category === 'All';
        const matchesCaste = scheme.caste === 'All' || scheme.caste.includes(userProfile.caste);
        const matchesIncome = userProfile.income <= scheme.maxIncome;
        if (matchesCategory && matchesCaste && matchesIncome) {
          isAutoMatched = true;
        }
      }
      return { ...scheme, isAutoMatched };
    });

    if (userProfile) {
      filtered.sort((a, b) => (b.isAutoMatched ? 1 : 0) - (a.isAutoMatched ? 1 : 0));
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    if (schemeCount) schemeCount.textContent = totalItems;

    if (totalItems === 0) {
      schemesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <h3>${t.noSchemesTitle}</h3>
          <p style="margin-top: 0.5rem;">${t.noSchemesSub}</p>
        </div>`;
      if (paginationBar) paginationBar.innerHTML = '';
      return;
    }

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    // Render localized scheme cards
    schemesGrid.innerHTML = pageItems.map(scheme => {
      return `
        <div class="scheme-card" style="${scheme.isAutoMatched ? 'border: 2px solid #22c55e;' : ''}">
          <div>
            <div class="card-top">
              <span class="badge ${scheme.level === 'Central' ? 'badge-central' : 'badge-state'}">
                ${scheme.level} • ${scheme.state}
              </span>
              ${scheme.isAutoMatched ? `<span class="badge" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:700;">${t.matchedBadge}</span>` : ''}
            </div>
            <h3>${scheme.title}</h3>
            <div class="ministry-label">🏛️ ${scheme.ministry}</div>
            <p>${scheme.summary}</p>
            <div class="benefit-highlight">
              <strong>${t.benefitPrefix}</strong> ${scheme.benefits}
            </div>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline" style="flex: 1;" onclick="openDetails('${scheme.id}')">${t.viewDetails}</button>
            <a href="${scheme.officialUrl}" target="_blank" rel="noopener" class="btn btn-primary">${t.applyOfficial}</a>
          </div>
        </div>
      `;
    }).join('');

    renderPaginationControls(totalPages);
  }

  function renderPaginationControls(totalPages) {
    if (!paginationBar) return;
    const t = (typeof I18N !== 'undefined' && I18N[currentLang]) ? I18N[currentLang] : I18N['en'];

    if (totalPages <= 1) {
      paginationBar.innerHTML = '';
      return;
    }

    let html = `
      <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
        ${t.prevBtn}
      </button>
    `;

    const visiblePages = 2;
    let startPage = Math.max(1, currentPage - visiblePages);
    let endPage = Math.min(totalPages, currentPage + visiblePages);

    if (startPage > 1) {
      html += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" onclick="goToPage(1)">1</button>`;
      if (startPage > 2) html += `<span class="page-dots">...</span>`;
    }

    for (let p = startPage; p <= endPage; p++) {
      html += `
        <button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goToPage(${p})">
          ${p}
        </button>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span class="page-dots">...</span>`;
      html += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    html += `
      <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
        ${t.nextBtn}
      </button>
    `;

    paginationBar.innerHTML = html;
  }

  window.goToPage = function(pageNum) {
    currentPage = pageNum;
    renderCitizenSchemes();
    const target = document.querySelector('.schemes-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  // Profile Management
  function updateProfileBannerUI() {
    const profile = (typeof DB !== 'undefined') ? DB.getSavedProfile() : null;
    if (profile && profileSetupPrompt && profileSummaryBanner) {
      profileSetupPrompt.style.display = 'none';
      profileSummaryBanner.style.display = 'flex';
      if (profileSummaryText) {
        profileSummaryText.textContent = `${profile.age} yrs • ${profile.occupation} • ${profile.caste} • Income: Up to ₹${(profile.income / 100000).toFixed(1)}L`;
      }
    } else if (profileSetupPrompt && profileSummaryBanner) {
      profileSetupPrompt.style.display = 'flex';
      profileSummaryBanner.style.display = 'none';
    }
  }

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const profileData = {
        age: document.getElementById('userAge').value,
        occupation: document.getElementById('userOccupation').value,
        caste: document.getElementById('userCaste').value,
        income: parseInt(document.getElementById('userIncome').value, 10)
      };

      if (typeof DB !== 'undefined') DB.saveProfile(profileData);
      closeProfileModal();
      updateProfileBannerUI();
      currentPage = 1;
      renderCitizenSchemes();
    });
  }

  window.clearProfilePreferences = function() {
    if (confirm('Reset your profile matching preferences?')) {
      if (typeof DB !== 'undefined') DB.clearProfile();
      updateProfileBannerUI();
      currentPage = 1;
      renderCitizenSchemes();
    }
  };

  window.openDetails = function(schemeId) {
    const scheme = getAllSchemes().find(s => s.id === schemeId);
    if (!scheme) return;
    const t = (typeof I18N !== 'undefined' && I18N[currentLang]) ? I18N[currentLang] : I18N['en'];

    document.getElementById('detailsContent').innerHTML = `
      <span class="badge ${scheme.level === 'Central' ? 'badge-central' : 'badge-state'}">${scheme.level}</span>
      <h2 style="margin: 0.75rem 0 0.5rem; color: var(--text-main); font-size: 1.45rem;">${scheme.title}</h2>
      <p style="color: var(--accent-blue); font-size: 0.9rem; margin-bottom: 1.5rem; font-weight: 500;">🏛️ ${scheme.ministry}</p>
      
      <h4 style="color: var(--text-main); margin-bottom: 0.4rem;">🎯 Description</h4>
      <p style="color: var(--text-muted); margin-bottom: 1.25rem;">${scheme.summary}</p>

      <h4 style="color: var(--text-main); margin-bottom: 0.4rem;">💰 ${t.benefitPrefix}</h4>
      <p style="color: var(--text-muted); margin-bottom: 1.25rem;">${scheme.benefits}</p>

      <h4 style="color: var(--text-main); margin-bottom: 0.4rem;">📋 Quota / Criteria</h4>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Applicable to: <strong>${scheme.caste}</strong> • Max Income: <strong>₹${scheme.maxIncome >= 9999999 ? 'No upper limit' : scheme.maxIncome.toLocaleString('en-IN')}</strong></p>

      <a href="${scheme.officialUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-block">
        ${t.applyOfficial}
      </a>
    `;
    detailsModal.classList.add('open');
  };

  // Feedback & Dynamic Dropdown
  function populateFeedbackSchemeDropdown() {
    const schemeSelect = document.getElementById('fbSchemeSelect');
    if (!schemeSelect) return;
    
    const all = getAllSchemes();
    schemeSelect.innerHTML = `
      <option value="">-- Choose a Scheme --</option>
      ${all.slice(0, 80).map(s => `<option value="${s.title}">${s.title} (${s.level})</option>`).join('')}
      <option value="General Portal Feedback">General / Entire Portal (Not Scheme-Specific)</option>
    `;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  window.openFeedbackModal = () => {
    populateFeedbackSchemeDropdown();
    if (document.getElementById('nameError')) document.getElementById('nameError').style.display = 'none';
    if (document.getElementById('emailError')) document.getElementById('emailError').style.display = 'none';
    if (document.getElementById('schemeError')) document.getElementById('schemeError').style.display = 'none';
    if (document.getElementById('reasonError')) document.getElementById('reasonError').style.display = 'none';
    feedbackModal.classList.add('open');
  };

  const fbEmailInput = document.getElementById('fbEmail');
  if (fbEmailInput) {
    fbEmailInput.addEventListener('input', () => {
      const emailError = document.getElementById('emailError');
      if (fbEmailInput.value.trim() && !isValidEmail(fbEmailInput.value)) {
        emailError.style.display = 'block';
      } else {
        emailError.style.display = 'none';
      }
    });
  }

  if (citizenFeedbackForm) {
    citizenFeedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('fbName').value.trim();
      const emailVal = document.getElementById('fbEmail').value.trim();
      const schemeVal = document.getElementById('fbSchemeSelect').value;
      const messageVal = document.getElementById('fbMessage').value.trim();

      let hasError = false;

      if (!nameVal) {
        document.getElementById('nameError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('nameError').style.display = 'none';
      }

      if (!isValidEmail(emailVal)) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('emailError').style.display = 'none';
      }

      if (!schemeVal) {
        document.getElementById('schemeError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('schemeError').style.display = 'none';
      }

      if (!messageVal) {
        document.getElementById('reasonError').style.display = 'block';
        hasError = true;
      } else {
        document.getElementById('reasonError').style.display = 'none';
      }

      if (hasError) return;

      const newFeedback = {
        type: document.getElementById('fbType').value,
        name: nameVal,
        email: emailVal,
        subject: schemeVal,
        message: messageVal
      };

      if (typeof DB !== 'undefined') DB.addFeedback(newFeedback);
      citizenFeedbackForm.reset();
      closeFeedbackModal();
      alert('Thank you! Your feedback and grievance details have been submitted to the administration.');
    });
  }

  // Admin Controller
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('adminUsernameInput').value.trim();
      const pass = document.getElementById('adminPasswordInput').value;

      if (user === 'admin' && pass === 'GovtPortal#2026@SecuredX!') {
        closeAdminLoginModal();
        adminLoginForm.reset();
        showAdminView();
      } else {
        alert('Access Denied: Invalid administrator credentials.');
      }
    });
  }

  function showAdminView() {
    citizenDashboardView.style.display = 'none';
    adminDashboardView.style.display = 'block';
    renderAdminDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.exitAdminView = function() {
    adminDashboardView.style.display = 'none';
    citizenDashboardView.style.display = 'block';
    renderCitizenSchemes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.showCitizenView = function() {
    exitAdminView();
  };

  function renderAdminDashboard() {
    const schemes = getAllSchemes();
    const feedbacks = (typeof DB !== 'undefined') ? DB.getFeedbacks() : [];
    const visitors = (typeof DB !== 'undefined') ? DB.getVisitorCount() : 142;

    if (statVisitors) statVisitors.textContent = visitors;
    if (statSchemes) statSchemes.textContent = schemes.length;
    if (statFeedbacks) statFeedbacks.textContent = feedbacks.length;

    if (adminFeedbacksTableBody) {
      if (feedbacks.length === 0) {
        adminFeedbacksTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No citizen feedbacks logged yet.</td></tr>`;
      } else {
        adminFeedbacksTableBody.innerHTML = feedbacks.map(item => `
          <tr>
            <td><span class="badge ${item.type === 'Report Issue' ? 'badge-central' : 'badge-state'}">${item.type}</span></td>
            <td><strong>${item.name}</strong><br><small style="color: var(--text-muted);">${item.email}</small></td>
            <td><strong>${item.subject}</strong><br><small style="color: var(--text-muted);">${item.message}</small></td>
            <td style="font-size: 0.82rem;">${item.timestamp}</td>
            <td>
              <span class="badge-status ${item.status === 'Resolved' || item.status === 'Reviewed' ? 'status-success' : 'badge-central'}">
                ${item.status}
              </span>
            </td>
            <td>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn btn-outline" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="handleToggleFeedbackStatus('${item.id}', '${item.status}')">
                  ${item.status === 'Pending' ? 'Mark Resolved' : 'Mark Pending'}
                </button>
                <button class="btn btn-danger" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="handleDeleteFeedback('${item.id}')">
                  ✕
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    if (adminSchemesTableBody) {
      adminSchemesTableBody.innerHTML = schemes.slice(0, 30).map(s => `
        <tr>
          <td><strong>${s.title}</strong></td>
          <td>${s.level} (${s.state})</td>
          <td>${s.category}</td>
          <td><small>${s.caste} • Up to ₹${s.maxIncome >= 9999999 ? 'No Limit' : (s.maxIncome / 100000).toFixed(1) + 'L'}</small></td>
          <td>
            <button class="btn btn-danger" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;" onclick="handleDeleteScheme('${s.id}')">
              Delete
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  if (addSchemeForm) {
    addSchemeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newScheme = {
        id: "custom_" + Date.now(),
        title: document.getElementById('schTitle').value.trim(),
        level: document.getElementById('schLevel').value,
        state: document.getElementById('schState').value,
        category: document.getElementById('schCategory').value,
        caste: document.getElementById('schCaste').value,
        maxIncome: parseInt(document.getElementById('schMaxIncome').value, 10) || 9999999,
        ministry: document.getElementById('schMinistry').value.trim(),
        benefits: document.getElementById('schBenefits').value.trim(),
        summary: document.getElementById('schSummary').value.trim(),
        officialUrl: document.getElementById('schUrl').value.trim()
      };

      const custom = JSON.parse(localStorage.getItem('ss_custom_schemes') || '[]');
      custom.unshift(newScheme);
      localStorage.setItem('ss_custom_schemes', JSON.stringify(custom));

      addSchemeForm.reset();
      alert('New welfare scheme published successfully!');
      renderAdminDashboard();
    });
  }

  window.handleDeleteScheme = function(schemeId) {
    if (confirm('Are you sure you want to delete this scheme?')) {
      let custom = JSON.parse(localStorage.getItem('ss_custom_schemes') || '[]');
      if (custom.some(s => s.id === schemeId)) {
        custom = custom.filter(s => s.id !== schemeId);
        localStorage.setItem('ss_custom_schemes', JSON.stringify(custom));
      } else {
        const deleted = JSON.parse(localStorage.getItem('ss_deleted_schemes') || '[]');
        deleted.push(schemeId);
        localStorage.setItem('ss_deleted_schemes', JSON.stringify(deleted));
      }
      renderAdminDashboard();
    }
  };

  window.handleToggleFeedbackStatus = function(id, currentStatus) {
    const nextStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    if (typeof DB !== 'undefined') DB.updateFeedbackStatus(id, nextStatus);
    renderAdminDashboard();
  };

  window.handleDeleteFeedback = function(id) {
    if (confirm('Delete this feedback entry?')) {
      if (typeof DB !== 'undefined') DB.deleteFeedback(id);
      renderAdminDashboard();
    }
  };

  // Modal Controls
  window.openAdminLoginModal = () => adminLoginModal && adminLoginModal.classList.add('open');
  window.closeAdminLoginModal = () => adminLoginModal && adminLoginModal.classList.remove('open');

  window.openProfileModal = () => {
    const saved = (typeof DB !== 'undefined') ? DB.getSavedProfile() : null;
    if (saved) {
      document.getElementById('userAge').value = saved.age;
      document.getElementById('userOccupation').value = saved.occupation;
      document.getElementById('userCaste').value = saved.caste;
      document.getElementById('userIncome').value = saved.income;
    }
    if (profileModal) profileModal.classList.add('open');
  };
  window.closeProfileModal = () => profileModal && profileModal.classList.remove('open');

  window.closeFeedbackModal = () => feedbackModal && feedbackModal.classList.remove('open');
  window.closeDetailsModal = () => detailsModal && detailsModal.classList.remove('open');

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
    }
  });

  // Secret Triggers
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminLoginModal();
    }
  });

  const secretLogo = document.getElementById('secretLogoTrigger');
  let clickCount = 0;
  let clickTimer = null;

  if (secretLogo) {
    secretLogo.addEventListener('click', (e) => {
      e.preventDefault();
      clickCount++;

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 600);

      if (clickCount >= 3) {
        clickCount = 0;
        openAdminLoginModal();
      }
    });
  }

  // Initial Load Trigger
  setTimeout(() => {
    applyLanguage(currentLang);
    updateProfileBannerUI();
  }, 20);
}); 