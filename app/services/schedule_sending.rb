module ScheduleSending
    extend ActiveSupport::Concern

  def self.call(dt1, dt2)
    rand(dt1.to_time()..dt2.to_time())
  end

end
