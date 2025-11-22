/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      //
    } catch (e) {
      console.log(`Error while wipe of the database: ${e}`);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('social_links', null, {});
    await queryInterface.bulkDelete('copyright', null, {});
    await queryInterface.bulkDelete('static_assets', null, {});
    await queryInterface.bulkDelete('faqs', null, {});
    await queryInterface.bulkDelete('not_found_page', null, {});
    await queryInterface.bulkDelete('whys_sections', null, {});
    await queryInterface.bulkDelete('menu_tiles', null, {});
    await queryInterface.bulkDelete('menu_page', null, {});
    await queryInterface.bulkDelete('blog_page', null, {});
    await queryInterface.bulkDelete('projects_page', null, {});
    await queryInterface.bulkDelete('home_page', null, {});
    await queryInterface.bulkDelete('maintenance_mode', null, {});
    await queryInterface.bulkDelete('contact_tiles', null, {});
    await queryInterface.bulkDelete('contact_page', null, {});
    await queryInterface.bulkDelete('privacy_sections', null, {});
    await queryInterface.bulkDelete('privacy_page', null, {});
    await queryInterface.bulkDelete('license_tiles', null, {});
    await queryInterface.bulkDelete('license_page', null, {});
    await queryInterface.bulkDelete('changelog_entries', null, {});
    await queryInterface.bulkDelete('changelog_page', null, {});
    await queryInterface.bulkDelete('certificates', null, {});
    await queryInterface.bulkDelete('positions', null, {});
    await queryInterface.bulkDelete('experiences', null, {});
    await queryInterface.bulkDelete('about_page', null, {});
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('articles', null, {});
    await queryInterface.bulkDelete('site_config', null, {});
    await queryInterface.bulkDelete('sessions', null, {});
    await queryInterface.bulkDelete('users_settings', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
