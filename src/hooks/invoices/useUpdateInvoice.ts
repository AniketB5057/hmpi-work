import { axios_instance } from "../../config"
import { updateOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Invoice } from "../../types/invoice"

const updateInvoice = async (invoice: Invoice): Promise<Invoice> => {
  const { data } = await axios_instance.put("/invoice", invoice, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(updateInvoice, {
    onSuccess: (invoice: Invoice) => {
      queryClient.setQueryData<any[]>(["invoices"], (oldInvoices) =>
        updateOne(oldInvoices, invoice)
      )
    },
  })

  return { isUpdatingInvoice: isLoading, updateInvoice: mutateAsync }
}
