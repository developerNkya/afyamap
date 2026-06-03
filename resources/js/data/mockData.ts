export interface Facility {
  id: string;
  name: string;
  region: string;
  category: string;
  safeCareLevel: number;
  jciAccredited: boolean;
  rating: number;
  reviewCount: number;
  distance?: string;
  services: string[];
  insurances: string[];
  image: string;
  gallery: string[];
  address: string;
  phone: string;
  email: string;
  hours: string;
  established: string;
  beds: string;
  emergency247: boolean;
  languages: string[];
  description: string;
  lat: number;
  lng: number;
}

export const regions = [
{
  slug: 'dar-es-salaam',
  name: 'Dar es Salaam',
  icon: 'Building2',
  count: 45
},
{ slug: 'mwanza', name: 'Mwanza', icon: 'Fish', count: 28 },
{ slug: 'arusha', name: 'Arusha', icon: 'Mountain', count: 32 },
{ slug: 'kilimanjaro', name: 'Kilimanjaro', icon: 'MountainSnow', count: 24 },
{ slug: 'dodoma', name: 'Dodoma', icon: 'Landmark', count: 19 },
{ slug: 'mbeya', name: 'Mbeya', icon: 'Trees', count: 21 },
{ slug: 'tanga', name: 'Tanga', icon: 'Waves', count: 15 },
{ slug: 'morogoro', name: 'Morogoro', icon: 'Map', count: 18 }];


export const categories = [
{
  slug: 'national-hospital',
  name: 'National Hospitals',
  icon: 'Building2',
  count: 4
},
{
  slug: 'zonal-referral',
  name: 'Zonal Referral',
  icon: 'Building',
  count: 6
},
{
  slug: 'regional-referral',
  name: 'Regional Referral',
  icon: 'Hospital',
  count: 28
},
{
  slug: 'private-hospital',
  name: 'Private Hospitals',
  icon: 'Stethoscope',
  count: 85
},
{ slug: 'maternity', name: 'Maternity Clinics', icon: 'Baby', count: 42 },
{ slug: 'dental', name: 'Dental Clinics', icon: 'Smile', count: 36 },
{
  slug: 'emergency',
  name: 'Emergency Centers',
  icon: 'Ambulance',
  count: 12
},
{
  slug: 'specialist',
  name: 'Specialist Centers',
  icon: 'Activity',
  count: 24
}];


export const servicesList = [
'Emergency',
'Maternity',
'Dental',
'Surgery',
'Laboratory',
'Radiology',
'Pharmacy',
'ICU',
'Specialist Clinics',
'Pediatrics',
'Eye Care'];


export const insurancesList = [
'NHIF',
'Jubilee',
'AAR',
'Strategis',
'Britam',
'MO Assurance'];


export const facilities: Facility[] = [
{
  id: 'f1',
  name: 'Muhimbili National Hospital',
  region: 'Dar es Salaam',
  category: 'National Hospitals',
  safeCareLevel: 4,
  jciAccredited: false,
  rating: 4.2,
  reviewCount: 1245,
  services: [
  'Emergency',
  'Surgery',
  'ICU',
  'Specialist Clinics',
  'Laboratory',
  'Radiology',
  'Pharmacy'],

  insurances: ['NHIF', 'Jubilee', 'AAR', 'Strategis'],
  image:
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'United Nations Road, Upanga, Dar es Salaam',
  phone: '+255 22 215 1367',
  email: 'info@mnh.go.tz',
  hours: '24 Hours',
  established: '1956',
  beds: '1500+',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'Muhimbili National Hospital (MNH) is the national referral hospital and university teaching hospital with 1,500 beds facility, attending 1,000 to 1,200 outpatients per day, admitting 1,000 to 1,200 inpatients per week.',
  lat: -6.8086,
  lng: 39.2743
},
{
  id: 'f2',
  name: 'Aga Khan Hospital Dar es Salaam',
  region: 'Dar es Salaam',
  category: 'Private Hospitals',
  safeCareLevel: 5,
  jciAccredited: true,
  rating: 4.8,
  reviewCount: 856,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'ICU',
  'Specialist Clinics',
  'Laboratory',
  'Radiology',
  'Pharmacy'],

  insurances: [
  'NHIF',
  'Jubilee',
  'AAR',
  'Strategis',
  'Britam',
  'MO Assurance'],

  image:
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'],

  address: 'Ocean Road, Dar es Salaam',
  phone: '+255 22 211 5151',
  email: 'info@akhst.org',
  hours: '24 Hours',
  established: '1964',
  beds: '170',
  emergency247: true,
  languages: ['Swahili', 'English', 'Gujarati'],
  description:
  'The Aga Khan Hospital, Dar es Salaam is a 170-bed multispecialty hospital offering quality health care. It is the only hospital in Tanzania to receive the prestigious Joint Commission International (JCI) accreditation.',
  lat: -6.8115,
  lng: 39.2945
},
{
  id: 'f3',
  name: 'KCMC — Kilimanjaro Christian Medical Centre',
  region: 'Kilimanjaro',
  category: 'Zonal Referral',
  safeCareLevel: 4,
  jciAccredited: false,
  rating: 4.5,
  reviewCount: 642,
  services: [
  'Emergency',
  'Surgery',
  'ICU',
  'Specialist Clinics',
  'Laboratory',
  'Radiology',
  'Pharmacy',
  'Eye Care'],

  insurances: ['NHIF', 'Jubilee', 'Strategis'],
  image:
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'Sokoine Road, Moshi, Kilimanjaro',
  phone: '+255 27 275 4377',
  email: 'kcmcadmin@kcmc.ac.tz',
  hours: '24 Hours',
  established: '1971',
  beds: '630',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'KCMC is a referral hospital for over 15 million people in Northern Tanzania. It is a huge complex with over 630 beds, with hundreds of outpatients and visitors coming to the centre every day.',
  lat: -3.3242,
  lng: 37.3364
},
{
  id: 'f4',
  name: 'Bugando Medical Centre',
  region: 'Mwanza',
  category: 'Zonal Referral',
  safeCareLevel: 4,
  jciAccredited: false,
  rating: 4.3,
  reviewCount: 512,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'ICU',
  'Specialist Clinics',
  'Laboratory',
  'Radiology',
  'Pharmacy'],

  insurances: ['NHIF', 'Jubilee', 'AAR'],
  image:
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'],

  address: 'Bugando Hill, Mwanza',
  phone: '+255 28 250 0513',
  email: 'info@bugandomedicalcentre.go.tz',
  hours: '24 Hours',
  established: '1971',
  beds: '950',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'Bugando Medical Centre is a consultant and teaching hospital for the Lake and Western zones of the United Republic of Tanzania. It is situated along the shores of Lake Victoria in Mwanza City.',
  lat: -2.5284,
  lng: 32.9056
},
{
  id: 'f5',
  name: 'Mbeya Zonal Referral Hospital',
  region: 'Mbeya',
  category: 'Zonal Referral',
  safeCareLevel: 3,
  jciAccredited: false,
  rating: 4.0,
  reviewCount: 320,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'Laboratory',
  'Radiology',
  'Pharmacy'],

  insurances: ['NHIF'],
  image:
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'Hospital Road, Mbeya',
  phone: '+255 25 250 3351',
  email: 'info@mzrh.go.tz',
  hours: '24 Hours',
  established: '1939',
  beds: '500',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'Mbeya Zonal Referral Hospital serves as a referral centre for the Southern Highlands Zone of Tanzania, providing specialized medical care, training, and research.',
  lat: -8.9094,
  lng: 33.4608
},
{
  id: 'f6',
  name: 'Mt. Meru Regional Referral Hospital',
  region: 'Arusha',
  category: 'Regional Referral',
  safeCareLevel: 3,
  jciAccredited: false,
  rating: 3.9,
  reviewCount: 415,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'Laboratory',
  'Radiology',
  'Pharmacy',
  'Pediatrics'],

  insurances: ['NHIF', 'Jubilee'],
  image:
  'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'Boma Road, Arusha',
  phone: '+255 27 250 3121',
  email: 'mtmeru@afyamap.tz',
  hours: '24 Hours',
  established: '1926',
  beds: '450',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'Mt. Meru Regional Referral Hospital is the main public hospital in Arusha region, providing a wide range of medical services to the local population and tourists.',
  lat: -3.3731,
  lng: 36.6922
},
{
  id: 'f7',
  name: 'Benjamin Mkapa Hospital',
  region: 'Dodoma',
  category: 'National Hospitals',
  safeCareLevel: 4,
  jciAccredited: false,
  rating: 4.6,
  reviewCount: 380,
  services: [
  'Emergency',
  'Surgery',
  'ICU',
  'Specialist Clinics',
  'Laboratory',
  'Radiology',
  'Pharmacy'],

  insurances: ['NHIF', 'Jubilee', 'AAR', 'Strategis'],
  image:
  'https://images.unsplash.com/photo-1504439468489-c8920d786a2b?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1504439468489-c8920d786a2b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'University of Dodoma Campus, Dodoma',
  phone: '+255 26 296 3710',
  email: 'info@bmh.or.tz',
  hours: '24 Hours',
  established: '2015',
  beds: '400',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'Benjamin Mkapa Hospital is a modern, state-of-the-art national hospital located in the capital city of Dodoma, offering highly specialized medical services.',
  lat: -6.1731,
  lng: 35.7516
},
{
  id: 'f8',
  name: 'TMJ Hospital',
  region: 'Dar es Salaam',
  category: 'Specialist Centers',
  safeCareLevel: 3,
  jciAccredited: false,
  rating: 4.1,
  reviewCount: 290,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'Laboratory',
  'Radiology',
  'Pharmacy',
  'Dental'],

  insurances: ['NHIF', 'Jubilee', 'AAR', 'Strategis', 'Britam'],
  image:
  'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'Old Bagamoyo Road, Mikocheni, Dar es Salaam',
  phone: '+255 22 277 5517',
  email: 'info@tmjhospital.com',
  hours: '24 Hours',
  established: '1998',
  beds: '120',
  emergency247: true,
  languages: ['Swahili', 'English', 'Hindi'],
  description:
  'TMJ Hospital is a leading private hospital in Dar es Salaam, known for its comprehensive medical services and specialized care in various disciplines.',
  lat: -6.7654,
  lng: 39.2543
},
{
  id: 'f9',
  name: 'Regency Medical Centre',
  region: 'Dar es Salaam',
  category: 'Private Hospitals',
  safeCareLevel: 4,
  jciAccredited: false,
  rating: 4.4,
  reviewCount: 450,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'ICU',
  'Laboratory',
  'Radiology',
  'Pharmacy',
  'Pediatrics'],

  insurances: ['NHIF', 'Jubilee', 'AAR', 'Strategis', 'Britam'],
  image:
  'https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'],

  address: 'Aly Khan Road, Upanga, Dar es Salaam',
  phone: '+255 22 215 0500',
  email: 'info@regencymedicalcentre.com',
  hours: '24 Hours',
  established: '1999',
  beds: '150',
  emergency247: true,
  languages: ['Swahili', 'English', 'Gujarati'],
  description:
  'Regency Medical Centre is a multi-specialty hospital providing high-quality healthcare services with a focus on patient safety and advanced medical technology.',
  lat: -6.8095,
  lng: 39.2789
},
{
  id: 'f10',
  name: 'Aga Khan Hospital Mwanza',
  region: 'Mwanza',
  category: 'Private Hospitals',
  safeCareLevel: 4,
  jciAccredited: false,
  rating: 4.6,
  reviewCount: 210,
  services: [
  'Emergency',
  'Maternity',
  'Surgery',
  'Laboratory',
  'Radiology',
  'Pharmacy',
  'Dental'],

  insurances: ['NHIF', 'Jubilee', 'AAR', 'Strategis', 'Britam'],
  image:
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  gallery: [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'],

  address: 'Nyerere Road, Mwanza',
  phone: '+255 28 250 2474',
  email: 'mwanza@akhst.org',
  hours: '24 Hours',
  established: '2010',
  beds: '50',
  emergency247: true,
  languages: ['Swahili', 'English'],
  description:
  'The Aga Khan Hospital, Mwanza provides high-quality, cost-effective healthcare services to the people of the Lake Zone.',
  lat: -2.5234,
  lng: 32.9012
}];