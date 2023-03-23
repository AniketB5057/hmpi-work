import { axios_instance } from "../../config"
import { addOne } from "../../utils/crudUtils"

import { getItem } from "../../utils/localStorage"
import { useMutation, useQueryClient } from "react-query"
import { Invoice } from "../../types/invoice"

const addInvoice = async (invoice: Invoice): Promise<Invoice> => {
  const { data } = await axios_instance.post("/invoice", invoice, {
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useAddInvoice() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(addInvoice, {
    onSuccess: (invoice: Invoice) => {
      queryClient.setQueryData<Invoice[]>(["invoices"], (oldInvoice) =>
        addOne(oldInvoice, invoice)
      )
    },
  })

  return { isAddingInvoice: isLoading, addInvoice: mutateAsync }
}
