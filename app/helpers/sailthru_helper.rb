module SailthruHelper
  # Generates the meta tags requires by Sailthru Horizon and adds the setup
  # script.
  #
  # Sailthru documentation:
  #
  #   http://getstarted.sailthru.com/node/61
  #
  # Options:
  #
  # - title: sailthru will use the default title tag otherwise
  # - tags:  sailthru will use the keywords meta tag otherwise
  #
  def sailthru_tags(opts = {})
    title = opts[:title]

    tags = if opts[:tags].kind_of?(Array)
      opts[:tags].join(', ')
    else
      opts[:tags]
    end

    content_for :meta do
      haml_tag(:meta, name: "sailthru.date",  content: Time.now)
      haml_tag(:meta, name: "sailthru.title", content: title) if title
      haml_tag(:meta, name: "sailthru.tags",  content: tags) if tags
    end
  end

  def register(params)
    return 409 if SailthruUser.exists?(params[:email])

    status = SailthruUser.create_or_update!(params)

    if params[:email_template] && status == 200
      SailthruEmail.send!(params[:email], params[:email_template])
    end

    status
  end
end
