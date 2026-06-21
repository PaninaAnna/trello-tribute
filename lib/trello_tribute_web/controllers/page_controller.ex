defmodule TrelloTributeWeb.PageController do
  use TrelloTributeWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
