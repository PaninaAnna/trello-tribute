defmodule TrelloTributeWeb.Router do
  use TrelloTributeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {TrelloTributeWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # API маршруты - должны быть ПЕРВЫМИ
  scope "/api", TrelloTributeWeb do
    pipe_through :api

    scope "/v1" do
      post "/registrations", Api.V1.RegistrationController, :create
      post "/sessions", Api.V1.SessionController, :create
      delete "/sessions", Api.V1.SessionController, :delete
      get "/current_user", Api.V1.CurrentUserController, :show
      get "/boards", Api.V1.BoardController, :index
      post "/boards", Api.V1.BoardController, :create
    end
  end

  # Catch-all для React - должен быть ПОСЛЕ API
  scope "/", TrelloTributeWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/*path", PageController, :home
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:trello_tribute, :dev_routes) do
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: TrelloTributeWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
