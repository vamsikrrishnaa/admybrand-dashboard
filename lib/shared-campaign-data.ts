// Shared campaign data used across all components
export interface Campaign {
  id: string
  name: string
  status: "active" | "paused" | "completed"
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
  createdAt: string
  category: string
  platform: string
}

export const sharedCampaignData: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024 - Premium Collection",
    status: "active",
    budget: 15000,
    spent: 12450,
    impressions: 245678,
    clicks: 12234,
    conversions: 892,
    ctr: 4.98,
    cpc: 1.02,
    roas: 4.2,
    createdAt: "2024-01-15",
    category: "Seasonal",
    platform: "Google Ads"
  },
  {
    id: "2",
    name: "Brand Awareness Q4 Campaign",
    status: "active",
    budget: 8500,
    spent: 6200,
    impressions: 180456,
    clicks: 8934,
    conversions: 567,
    ctr: 4.95,
    cpc: 0.69,
    roas: 3.8,
    createdAt: "2024-02-01",
    category: "Brand",
    platform: "Facebook Ads"
  },
  {
    id: "3",
    name: "Holiday Collection Launch",
    status: "paused",
    budget: 22000,
    spent: 18900,
    impressions: 320123,
    clicks: 18765,
    conversions: 1234,
    ctr: 5.86,
    cpc: 1.01,
    roas: 5.1,
    createdAt: "2024-01-20",
    category: "Product Launch",
    platform: "Google Ads"
  },
  {
    id: "4",
    name: "Back to School Promotion",
    status: "completed",
    budget: 12000,
    spent: 11800,
    impressions: 198765,
    clicks: 9876,
    conversions: 654,
    ctr: 4.97,
    cpc: 1.19,
    roas: 3.2,
    createdAt: "2024-01-10",
    category: "Seasonal",
    platform: "Microsoft Ads"
  },
  {
    id: "5",
    name: "New Product Line Teaser",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 89456,
    clicks: 4567,
    conversions: 234,
    ctr: 5.11,
    cpc: 0.7,
    roas: 2.8,
    createdAt: "2024-02-10",
    category: "Product Launch",
    platform: "TikTok Ads"
  },
  {
    id: "6",
    name: "Valentine's Day Special",
    status: "completed",
    budget: 7500,
    spent: 7200,
    impressions: 156789,
    clicks: 7890,
    conversions: 445,
    ctr: 5.03,
    cpc: 0.91,
    roas: 3.6,
    createdAt: "2024-01-25",
    category: "Seasonal",
    platform: "Instagram Ads"
  },
  {
    id: "7",
    name: "Retargeting Campaign - Cart Abandoners",
    status: "active",
    budget: 3000,
    spent: 2100,
    impressions: 45678,
    clicks: 2345,
    conversions: 189,
    ctr: 5.13,
    cpc: 0.89,
    roas: 4.8,
    createdAt: "2024-02-05",
    category: "Retargeting",
    platform: "Google Ads"
  },
  {
    id: "8",
    name: "Influencer Collaboration - Spring",
    status: "paused",
    budget: 18000,
    spent: 15600,
    impressions: 289456,
    clicks: 14567,
    conversions: 987,
    ctr: 5.03,
    cpc: 1.07,
    roas: 4.5,
    createdAt: "2024-01-30",
    category: "Influencer",
    platform: "Instagram Ads"
  },
  {
    id: "9",
    name: "Black Friday Mega Sale",
    status: "completed",
    budget: 35000,
    spent: 34500,
    impressions: 567890,
    clicks: 28945,
    conversions: 2156,
    ctr: 5.09,
    cpc: 1.19,
    roas: 6.2,
    createdAt: "2023-11-01",
    category: "Seasonal",
    platform: "Google Ads"
  },
  {
    id: "10",
    name: "Mobile App Install Campaign",
    status: "active",
    budget: 12000,
    spent: 8900,
    impressions: 234567,
    clicks: 11234,
    conversions: 567,
    ctr: 4.79,
    cpc: 0.79,
    roas: 3.4,
    createdAt: "2024-02-15",
    category: "App Install",
    platform: "Facebook Ads"
  }
]