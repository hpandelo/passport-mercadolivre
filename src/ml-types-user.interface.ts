interface Identification {
  type: string
  number: string
}

interface Address {
  state: string
  city: string
  address: string
  zip_code: string
}

interface Phone {
  area_code: string
  number: string
  extension: string
  verified: boolean
}

interface SellerReputation {
  level_id: string | null
  power_seller_status: string | null
  transactions: {
    period: string
    total: number
    completed: number
    canceled: number
    ratings: {
      positive: number
      negative: number
      neutral: number
    }
  }
}

interface BuyerReputation {
  canceled_transactions: number
  transactions: {
    period: string
    total: number | null
    completed: number | null
    canceled: {
      total: number | null
      paid: number | null
    }
    unrated: {
      total: number | null
      paid: number | null
    }
    not_yet_rated: {
      total: number | null
      paid: number | null
      units: number | null
    }
  }
  tags: string[]
}

interface Status {
  site_status: string
  list: {
    allow: boolean
    codes: string[]
    immediate_payment: {
      required: boolean
      reasons: string[]
    }
  }
  buy: {
    allow: boolean
    codes: string[]
    immediate_payment: {
      required: boolean
      reasons: string[]
    }
  }
  sell: {
    allow: boolean
    codes: string[]
    immediate_payment: {
      required: boolean
      reasons: string[]
    }
  }
  billing: {
    allow: boolean
    codes: string[]
  }
  mercadopago_tc_accepted: boolean
  mercadopago_account_type: string
  mercadoenvios: string
  immediate_payment: boolean
  confirmed_email: boolean
  user_type: string
  required_action: string
}

interface Credit {
  consumed: number
  credit_level_id: string
}

export interface MLUser {
  id: number
  nickname: string
  registration_date: string
  first_name: string
  last_name: string
  country_id: string
  email: string
  identification: Identification
  address: Address
  phone: Phone
  alternative_phone: Phone
  user_type: string
  tags: string[]
  logo: null
  points: number
  site_id: string
  permalink: string
  seller_experience: string
  seller_reputation: SellerReputation
  buyer_reputation: BuyerReputation
  status: Status
  credit: Credit
}

export type TestUser = Partial<MLUser>
