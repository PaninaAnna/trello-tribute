defmodule TrelloTributeWeb.UserChannel do
  use TrelloTributeWeb, :channel

  def join("users:" <> _user_id, _params, socket) do
    {:ok, socket}
  end
end
