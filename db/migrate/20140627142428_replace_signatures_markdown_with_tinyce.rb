class ReplaceSignaturesMarkdownWithTinyce < ActiveRecord::Migration

  def change
    markdown = Redcarpet::Markdown.new Redcarpet::Render::HTML
    User.all.each do |user|
      if user.signature.present?
        user.signature = markdown.render(user.signature).html_safe
        user.save!
      end
    end

    Ticket.all.each do |ticket|
      if ticket.content.present?
        ticket.content = markdown.render(ticket.content).html_safe
        ticket.save!
      end
    end
  end
end
